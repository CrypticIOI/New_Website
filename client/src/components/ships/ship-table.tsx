import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { ships, type Ship, type ShipClass } from "@/data/ships";
import { useMemo, useState, useCallback } from "react";
import { ShipTableHeader, type SortConfig, type SortField } from "./ship-table-header";
import { ShipFilters } from "./ship-filters";
import { ShipTableRow } from "./ship-table-row";

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

export function ShipTable() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<ShipClass | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: null, direction: "asc" });
  const [excludeNPCShips, setExcludeNPCShips] = useState(false);

  // Memoize manufacturers list to prevent unnecessary recalculations
  const manufacturers = useMemo(() => (
    Array.from(new Set(ships.map(ship => ship.manufacturer))).sort()
  ), []);

  // Memoize filter function
  const filterShip = useCallback((ship: Ship) => {
    const searchLower = search.toLowerCase();
    if (searchLower) {
      const matchesSearch = ship.name.toLowerCase().includes(searchLower) ||
                          ship.manufacturer.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    if (selectedClass !== "all" && ship.class !== selectedClass) return false;
    if (selectedManufacturer !== "all" && ship.manufacturer !== selectedManufacturer) return false;
    if (excludeNPCShips && (ship.manufacturer === "Xenon" || ship.manufacturer === "Kha'ak")) return false;

    return true;
  }, [search, selectedClass, selectedManufacturer, excludeNPCShips]);

  // Memoize sort function
  const sortShips = useCallback((a: Ship, b: Ship) => {
    if (!sortConfig.field) return 0;
    const aValue = a[sortConfig.field];
    const bValue = b[sortConfig.field];
    return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
  }, [sortConfig]);

  // Memoize filtered and sorted ships
  const filteredAndSortedShips = useMemo(() => {
    const filtered = ships.filter(filterShip);
    return sortConfig.field ? filtered.sort(sortShips) : filtered;
  }, [filterShip, sortConfig.field, sortShips]);

  // Memoize paginated ships to prevent unnecessary calculations
  const paginatedShips = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedShips.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedShips, currentPage]);

  // Reset page when filters change
  const resetPage = useCallback(() => setCurrentPage(1), []);

  // Handler for sorting
  const handleSort = useCallback((field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }));
    resetPage();
  }, [resetPage]);

  // Handlers for filter changes
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    resetPage();
  }, [resetPage]);

  const handleClassChange = useCallback((value: ShipClass | "all") => {
    setSelectedClass(value);
    resetPage();
  }, [resetPage]);

  const handleManufacturerChange = useCallback((value: string) => {
    setSelectedManufacturer(value);
    resetPage();
  }, [resetPage]);

  const handleExcludeNPCChange = useCallback((value: boolean) => {
    setExcludeNPCShips(value);
    resetPage();
  }, [resetPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedShips.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <ShipFilters
        search={search}
        onSearchChange={handleSearchChange}
        selectedClass={selectedClass}
        onClassChange={handleClassChange}
        selectedManufacturer={selectedManufacturer}
        onManufacturerChange={handleManufacturerChange}
        excludeNPCShips={excludeNPCShips}
        onExcludeNPCChange={handleExcludeNPCChange}
        manufacturers={manufacturers}
        shipClasses={shipClasses}
        totalShips={filteredAndSortedShips.length}
      />

      <div className="rounded-md border border-white/10 bg-black/40 backdrop-blur-sm">
        <Table>
          <ShipTableHeader 
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          <TableBody>
            {paginatedShips.map((ship) => (
              <ShipTableRow key={ship.id} ship={ship} />
            ))}
          </TableBody>
        </Table>
      </div>

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