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
  { key: 'name', label: 'Name', width: '20%', align: 'left', sortable: false },
  { key: 'class', label: 'Class', width: '15%', align: 'left', sortable: false },
  { key: 'size', label: 'Size', width: '10%', align: 'left', sortable: false },
  { key: 'price', label: 'Price', width: '12%', align: 'right', sortable: true },
  { key: 'crew', label: 'Crew', width: '10%', align: 'right', sortable: true },
  { key: 'cargo', label: 'Cargo', width: '12%', align: 'right', sortable: true },
  { key: 'speed', label: 'Speed', width: '10%', align: 'right', sortable: true },
  { key: 'manufacturer', label: 'Manufacturer', width: '11%', align: 'left', sortable: false },
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
        <div 
          ref={tableContainerRef}
          className="rounded-md border border-white/10 bg-black/40 backdrop-blur-sm"
          style={{ height: TABLE_HEIGHT, overflowY: "auto" }}
        >
          <Table aria-label="Ships database">
            <TableHeader className="sticky top-0 bg-black/60 backdrop-blur-sm z-10">
              <TableRow className="border-b border-white/10">
                {COLUMNS.map(column => (
                  <TableHead 
                    key={column.key}
                    className="text-white/70"
                    style={{ 
                      width: column.width,
                      textAlign: column.align as any,
                      cursor: column.sortable ? 'pointer' : 'default'
                    }}
                    onClick={() => {
                      if (column.sortable) {
                        handleSort(column.key as SortField);
                      }
                    }}
                    role={column.sortable ? "button" : undefined}
                    tabIndex={column.sortable ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleSort(column.key as SortField);
                      }
                    }}
                    aria-sort={
                      column.sortable
                        ? sortConfig.field === column.key
                          ? sortConfig.direction
                          : 'none'
                        : undefined
                    }
                  >
                    <div className={`flex items-center ${column.align === 'right' ? 'justify-end' : ''}`}>
                      {column.label}
                      {column.sortable && getSortIcon(column.key as SortField)}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="h-[400px]">
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={8} className="p-0">
                    <div 
                      style={{ 
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative'
                      }}
                    >
                      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const ship = filteredAndSortedShips[virtualRow.index];
                        return (
                          <TableRow
                            key={ship.id}
                            className="border-b border-white/10 transition-colors hover:bg-white/5"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: `${ROW_HEIGHT}px`,
                              transform: `translateY(${virtualRow.start}px)`,
                            }}
                          >
                            <TableCell style={{ width: COLUMNS[0].width }} className="text-primary/90 font-medium">
                              {ship.name}
                            </TableCell>
                            <TableCell style={{ width: COLUMNS[1].width }} className="text-primary/90">
                              {ship.class}
                            </TableCell>
                            <TableCell style={{ width: COLUMNS[2].width }} className="text-primary/90">
                              {ship.size}
                            </TableCell>
                            <TableCell style={{ width: COLUMNS[3].width }} className="text-primary/90 text-right">
                              {ship.price > 0 ? ship.price.toLocaleString() : 'N/A'}
                            </TableCell>
                            <TableCell style={{ width: COLUMNS[4].width }} className="text-primary/90 text-right">
                              {ship.crew}
                            </TableCell>
                            <TableCell style={{ width: COLUMNS[5].width }} className="text-primary/90 text-right">
                              {ship.cargo}
                            </TableCell>
                            <TableCell style={{ width: COLUMNS[6].width }} className="text-primary/90 text-right">
                              {ship.speed}
                            </TableCell>
                            <TableCell style={{ width: COLUMNS[7].width }} className="text-primary/90">
                              {ship.manufacturer}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}