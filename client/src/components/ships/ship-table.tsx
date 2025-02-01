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

// Number of items to show per page
const ITEMS_PER_PAGE = 20;

export function ShipTable() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<ShipClass | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize filtered ships to prevent recalculation on every render
  const filteredShips = useMemo(() => {
    return ships.filter(ship => {
      const matchesSearch = ship.name.toLowerCase().includes(search.toLowerCase()) ||
                          ship.manufacturer.toLowerCase().includes(search.toLowerCase());
      const matchesClass = selectedClass === "all" || ship.class === selectedClass;
      return matchesSearch && matchesClass;
    });
  }, [search, selectedClass]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredShips.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedShips = filteredShips.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Memoize handlers
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  }, []);

  const handleClassChange = useCallback((value: string) => {
    setSelectedClass(value as ShipClass | "all");
    setCurrentPage(1); // Reset to first page on class change
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-col sm:flex-row">
        <Input
          placeholder="Search ships or manufacturers..."
          value={search}
          onChange={handleSearch}
          className="max-w-sm bg-white/5 border-white/10 text-white placeholder:text-white/50"
        />
        <Select value={selectedClass} onValueChange={handleClassChange}>
          <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Ship class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All classes</SelectItem>
            {shipClasses.map(cls => (
              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border border-white/10 bg-black/40 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead className="text-white/70">Name</TableHead>
              <TableHead className="text-white/70">Class</TableHead>
              <TableHead className="text-white/70">Size</TableHead>
              <TableHead className="text-white/70 text-right">Price</TableHead>
              <TableHead className="text-white/70 text-right">Crew</TableHead>
              <TableHead className="text-white/70 text-right">Cargo</TableHead>
              <TableHead className="text-white/70 text-right">Speed</TableHead>
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