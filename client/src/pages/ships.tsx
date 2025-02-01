import { useState, useMemo, useCallback } from "react";
import { ships, type Ship, type ShipClass } from "@/data/ships";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const ITEMS_PER_PAGE = 25;

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

type SortField = "price" | "crew" | "cargo" | "speed";
type SortDirection = "asc" | "desc";

export default function Ships() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<ShipClass | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [sortConfig, setSortConfig] = useState<{field: SortField | null; direction: SortDirection}>({ 
    field: null, 
    direction: "asc" 
  });
  const [excludeNPCShips, setExcludeNPCShips] = useState(false);

  // Memoize manufacturers list
  const manufacturers = useMemo(() => (
    Array.from(new Set(ships.map(ship => ship.manufacturer))).sort()
  ), []);

  // Memoize filtered and sorted ships
  const filteredAndSortedShips = useMemo(() => {
    const searchLower = search.toLowerCase();

    // Filter
    let filtered = ships.filter(ship => {
      if (searchLower && !ship.name.toLowerCase().includes(searchLower) && 
          !ship.manufacturer.toLowerCase().includes(searchLower)) {
        return false;
      }
      if (selectedClass !== "all" && ship.class !== selectedClass) return false;
      if (selectedManufacturer !== "all" && ship.manufacturer !== selectedManufacturer) return false;
      if (excludeNPCShips && (ship.manufacturer === "Xenon" || ship.manufacturer === "Kha'ak")) return false;
      return true;
    });

    // Sort
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

  // Handle sort
  const handleSort = useCallback((field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }));
    setCurrentPage(1);
  }, []);

  // Sort indicator
  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? 
      <ArrowUp className="ml-2 h-4 w-4" /> : 
      <ArrowDown className="ml-2 h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Ships Database</h1>
        <p className="text-white/80">
          Browse and compare ships available in X4: Foundations
        </p>
        <div className="text-sm text-primary/80">
          Total ships in database: {ships.length}
        </div>
      </div>

      <div className="space-y-4">
        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Search ships or manufacturers..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="max-w-sm bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
          <div className="flex gap-4">
            <Select 
              value={selectedClass} 
              onValueChange={(value) => {
                setSelectedClass(value as ShipClass | "all");
                setCurrentPage(1);
              }}
            >
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

            <Select 
              value={selectedManufacturer} 
              onValueChange={(value) => {
                setSelectedManufacturer(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select manufacturer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All manufacturers</SelectItem>
                {manufacturers.map(manufacturer => (
                  <SelectItem key={manufacturer} value={manufacturer}>
                    {manufacturer}
                  </SelectItem>
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
              setCurrentPage(1);
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
    </div>
  );
}