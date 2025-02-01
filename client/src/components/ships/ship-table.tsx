import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ships, type Ship, type ShipClass } from "@/data/ships";
import { useMemo, useState, useCallback } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const shipClasses: ShipClass[] = [
  "Scout",
  "Fighter",
  "Heavy Fighter",
  "Corvette",
  "Frigate",
  "Destroyer",
  "Carrier",
  "Trader",
  "Miner",
  "Transport",
  "Gunship",
  "Auxiliary"
];

// Increased items per page for better browsing
const ITEMS_PER_PAGE = 25;

type SortField = "price" | "crew" | "cargo" | "speed";
type SortDirection = "asc" | "desc";

type SortConfig = {
  field: SortField | null;
  direction: SortDirection;
};

export function ShipTable() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<ShipClass | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: null, direction: "asc" });
  const [excludeNPCShips, setExcludeNPCShips] = useState(false);

  // Get unique manufacturers (memoized)
  const manufacturers = useMemo(() => {
    return Array.from(new Set(ships.map(ship => ship.manufacturer))).sort();
  }, []);

  // Memoize filtered and sorted ships
  const filteredAndSortedShips = useMemo(() => {
    let filtered = ships.filter(ship => {
      const matchesSearch = ship.name.toLowerCase().includes(search.toLowerCase()) ||
                          ship.manufacturer.toLowerCase().includes(search.toLowerCase());
      const matchesClass = selectedClass === "all" || ship.class === selectedClass;
      const matchesManufacturer = selectedManufacturer === "all" || ship.manufacturer === selectedManufacturer;
      const passesNPCFilter = !excludeNPCShips || 
                            (ship.manufacturer !== "Xenon" && ship.manufacturer !== "Kha'ak");

      return matchesSearch && matchesClass && matchesManufacturer && passesNPCFilter;
    });

    // Sort if a sort field is selected
    if (sortConfig.field) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.field!];
        const bValue = b[sortConfig.field!];
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      });
    }

    return filtered;
  }, [search, selectedClass, selectedManufacturer, sortConfig, excludeNPCShips]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedShips.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedShips = filteredAndSortedShips.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when filters change
  const resetPage = useCallback(() => setCurrentPage(1), []);

  // Handler for sorting
  const handleSort = useCallback((field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }));
    resetPage();
  }, []);

  // Function to render sort indicator (memoized)
  const getSortIcon = useCallback((field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? 
      <ArrowUp className="ml-2 h-4 w-4" /> : 
      <ArrowDown className="ml-2 h-4 w-4" />;
  }, [sortConfig]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="Search ships or manufacturers..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            resetPage();
          }}
          className="max-w-sm bg-white/5 border-white/10 text-white placeholder:text-white/50"
        />
        <div className="flex gap-4">
          <Select value={selectedClass} onValueChange={(value) => {
            setSelectedClass(value as ShipClass | "all");
            resetPage();
          }}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All classes</SelectItem>
              {shipClasses.map(cls => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedManufacturer} onValueChange={(value) => {
            setSelectedManufacturer(value);
            resetPage();
          }}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Select manufacturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All manufacturers</SelectItem>
              {manufacturers.map(manufacturer => (
                <SelectItem key={manufacturer} value={manufacturer}>{manufacturer}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* NPC Ships Filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="exclude-npc"
          checked={excludeNPCShips}
          onCheckedChange={(checked) => {
            setExcludeNPCShips(checked as boolean);
            resetPage();
          }}
          className="bg-white/5 border-white/10"
        />
        <label
          htmlFor="exclude-npc"
          className="text-sm font-medium text-white cursor-pointer"
        >
          Exclude Xenon and Kha'ak ships
        </label>
      </div>

      {/* Filter Summary */}
      <div className="flex items-center h-8 text-sm">
        <div className="text-primary font-medium">
          {filteredAndSortedShips.length.toLocaleString()} ships found
          {selectedClass !== "all" && ` • Class: ${selectedClass}`}
          {selectedManufacturer !== "all" && ` • Manufacturer: ${selectedManufacturer}`}
          {search && ` • Search: "${search}"`}
          {excludeNPCShips && ` • Excluding NPC ships`}
        </div>
      </div>

      {/* Ship Table */}
      <div className="rounded-md border border-white/10 bg-black/40 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead className="text-white/70">Name</TableHead>
              <TableHead className="text-white/70">Class</TableHead>
              <TableHead className="text-white/70">Size</TableHead>
              <TableHead 
                className="text-white/70 text-right cursor-pointer select-none"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center justify-end">
                  Price
                  {getSortIcon("price")}
                </div>
              </TableHead>
              <TableHead 
                className="text-white/70 text-right cursor-pointer select-none"
                onClick={() => handleSort("crew")}
              >
                <div className="flex items-center justify-end">
                  Crew
                  {getSortIcon("crew")}
                </div>
              </TableHead>
              <TableHead 
                className="text-white/70 text-right cursor-pointer select-none"
                onClick={() => handleSort("cargo")}
              >
                <div className="flex items-center justify-end">
                  Cargo
                  {getSortIcon("cargo")}
                </div>
              </TableHead>
              <TableHead 
                className="text-white/70 text-right cursor-pointer select-none"
                onClick={() => handleSort("speed")}
              >
                <div className="flex items-center justify-end">
                  Speed
                  {getSortIcon("speed")}
                </div>
              </TableHead>
              <TableHead className="text-white/70">Manufacturer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedShips.map((ship) => (
              <TableRow 
                key={ship.id} 
                className="border-b border-white/10 transition-colors hover:bg-white/5"
              >
                <TableCell className="text-primary/90 font-medium">{ship.name}</TableCell>
                <TableCell className="text-primary/90">{ship.class}</TableCell>
                <TableCell className="text-primary/90">{ship.size}</TableCell>
                <TableCell className="text-primary/90 text-right">
                  {ship.price > 0 ? ship.price.toLocaleString() : 'N/A'}
                </TableCell>
                <TableCell className="text-primary/90 text-right">{ship.crew}</TableCell>
                <TableCell className="text-primary/90 text-right">{ship.cargo}</TableCell>
                <TableCell className="text-primary/90 text-right">{ship.speed}</TableCell>
                <TableCell className="text-primary/90">{ship.manufacturer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/70 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-white/70">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/70 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}