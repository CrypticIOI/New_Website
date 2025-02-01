import { useState, useMemo, useCallback, useRef } from "react";
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
import { ArrowUpDown, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useToast } from "@/hooks/use-toast";

const ROW_HEIGHT = 48;
const TABLE_HEIGHT = 600;

const COLUMNS = [
  { key: 'name', label: 'Name', width: 240, align: 'left', sortable: false },
  { key: 'class', label: 'Class', width: 180, align: 'left', sortable: false },
  { key: 'size', label: 'Size', width: 120, align: 'left', sortable: false },
  { key: 'price', label: 'Price', width: 144, align: 'right', sortable: true },
  { key: 'crew', label: 'Crew', width: 120, align: 'right', sortable: true },
  { key: 'cargo', label: 'Cargo', width: 144, align: 'right', sortable: true },
  { key: 'speed', label: 'Speed', width: 120, align: 'right', sortable: true },
  { key: 'manufacturer', label: 'Manufacturer', width: 132, align: 'left', sortable: false },
];

const shipClasses: ShipClass[] = [
  "Scout", "Fighter", "Heavy Fighter", "Corvette", "Frigate", 
  "Destroyer", "Carrier", "Trader", "Miner", "Transport",
  "Gunship", "Auxiliary"
];

type SortField = "price" | "crew" | "cargo" | "speed";
type SortDirection = "asc" | "desc";

export default function Ships() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<ShipClass | "all">("all");
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [sortConfig, setSortConfig] = useState<{field: SortField | null; direction: SortDirection}>({ 
    field: null, 
    direction: "asc" 
  });
  const [excludeNPCShips, setExcludeNPCShips] = useState(false);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Simulate loading state
  useState(() => {
    setTimeout(() => setIsLoading(false), 500);
  });

  // Memoize manufacturers list
  const manufacturers = useMemo(() => (
    Array.from(new Set(ships.map(ship => ship.manufacturer))).sort()
  ), []);

  // Memoize filtered and sorted ships
  const filteredAndSortedShips = useMemo(() => {
    if (isLoading) return [];

    const searchLower = search.toLowerCase();

    try {
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
    } catch (error) {
      toast({
        title: "Error filtering ships",
        description: "There was an error filtering the ships data. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  }, [search, selectedClass, selectedManufacturer, sortConfig, excludeNPCShips, isLoading]);

  // Virtual row handling
  const rowVirtualizer = useVirtualizer({
    count: filteredAndSortedShips.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  // Handle sort
  const handleSort = useCallback((field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }));
  }, []);

  // Sort indicator
  const getSortIcon = (field: string) => {
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
        <div className="grid gap-4 md:grid-cols-2" role="search">
          <Input
            placeholder="Search ships or manufacturers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm bg-white/5 border-white/10 text-white placeholder:text-white/50"
            aria-label="Search ships or manufacturers"
          />
          <div className="flex gap-4">
            <Select 
              value={selectedClass} 
              onValueChange={(value) => setSelectedClass(value as ShipClass | "all")}
            >
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white" aria-label="Filter by ship class">
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
              onValueChange={setSelectedManufacturer}
            >
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white" aria-label="Filter by manufacturer">
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
            onCheckedChange={(checked) => setExcludeNPCShips(checked as boolean)}
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
        <div className="overflow-hidden rounded-md border border-white/10 bg-black/40 backdrop-blur-sm">
          <div
            ref={tableContainerRef}
            className="relative"
            style={{ height: TABLE_HEIGHT }}
          >
            <Table>
              <TableHeader className="sticky top-0 bg-black/60 backdrop-blur-sm z-10">
                <TableRow className="border-b border-white/10">
                  {COLUMNS.map(column => (
                    <TableHead
                      key={column.key}
                      className={`text-white/70 ${column.sortable ? 'cursor-pointer select-none' : ''}`}
                      style={{
                        width: column.width,
                        padding: '12px 16px',
                      }}
                      onClick={() => column.sortable && handleSort(column.key as SortField)}
                    >
                      <div className={`flex items-center ${column.align === 'right' ? 'justify-end' : ''}`}>
                        {column.label}
                        {column.sortable && getSortIcon(column.key)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={COLUMNS.length}
                      className="h-[400px] text-center"
                    >
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <div
                    style={{
                      height: rowVirtualizer.getTotalSize(),
                      position: 'relative',
                      width: '100%',
                    }}
                  >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                      const ship = filteredAndSortedShips[virtualRow.index];
                      return (
                        <TableRow
                          key={ship.id}
                          className="absolute top-0 left-0 border-b border-white/10"
                          style={{
                            height: ROW_HEIGHT,
                            transform: `translateY(${virtualRow.start}px)`,
                            width: '100%',
                          }}
                        >
                          {COLUMNS.map(column => (
                            <TableCell
                              key={column.key}
                              className="text-primary/90"
                              style={{
                                width: column.width,
                                padding: '12px 16px',
                                textAlign: column.align,
                              }}
                            >
                              {column.key === 'price' && ship.price === 0
                                ? 'N/A'
                                : column.key === 'price'
                                ? ship[column.key].toLocaleString()
                                : ship[column.key as keyof Ship]}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </div>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}