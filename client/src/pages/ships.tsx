import { useState, useMemo, useCallback, lazy, Suspense, memo } from "react";
import { ships, type Ship, type ShipClass } from "@/data/ships";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import debounce from "lodash/debounce";

const SHIPS_PER_PAGE = 16; // 4x4 grid

const shipClasses: ShipClass[] = [
  "Scout", "Fighter", "Heavy Fighter", "Corvette", "Frigate", 
  "Destroyer", "Carrier", "Trader", "Miner", "Transport",
  "Gunship", "Auxiliary"
];

type SortField = "price" | "crew" | "cargo" | "speed";
type SortDirection = "asc" | "desc";

// Memoized ShipCard component
const ShipCard = memo(({ ship }: { ship: Ship }) => (
  <Card className="relative h-full overflow-hidden border-white/10 bg-black/40 backdrop-blur-sm hover:bg-white/5 transition-colors">
    <div className="p-4 space-y-3">
      <div className="space-y-1">
        <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
          {ship.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <span>{ship.manufacturer}</span>
          <span className="text-white/30">•</span>
          <span>{ship.class}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="space-y-1">
          <div className="text-white/50">Price</div>
          <div className="font-medium text-white">
            {ship.price > 0 ? ship.price.toLocaleString() : 'N/A'}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-white/50">Crew</div>
          <div className="font-medium text-white">{ship.crew}</div>
        </div>
        <div className="space-y-1">
          <div className="text-white/50">Cargo</div>
          <div className="font-medium text-white">{ship.cargo}</div>
        </div>
        <div className="space-y-1">
          <div className="text-white/50">Speed</div>
          <div className="font-medium text-white">{ship.speed}</div>
        </div>
      </div>
    </div>
  </Card>
));

ShipCard.displayName = 'ShipCard';

export default function Ships() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<ShipClass | "all">("all");
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [sortConfig, setSortConfig] = useState<{field: SortField | null; direction: SortDirection}>({ 
    field: null, 
    direction: "asc" 
  });
  const [excludeNPCShips, setExcludeNPCShips] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Simulate loading state
  useState(() => {
    setTimeout(() => setIsLoading(false), 500);
  });

  // Memoize manufacturers list
  const manufacturers = useMemo(() => (
    Array.from(new Set(ships.map(ship => ship.manufacturer))).sort()
  ), []);

  // Debounced search handler
  const debouncedSetSearch = useCallback(
    debounce((value: string) => setDebouncedSearch(value), 300),
    []
  );

  // Handle search input
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSetSearch(e.target.value);
  }, [debouncedSetSearch]);

  // Memoize filtered and sorted ships
  const filteredAndSortedShips = useMemo(() => {
    if (isLoading) return [];

    const searchLower = debouncedSearch.toLowerCase();

    try {
      // Filter
      let filtered = ships;

      if (searchLower) {
        filtered = filtered.filter(ship => 
          ship.name.toLowerCase().includes(searchLower)
          // Removed manufacturer search as requested
        );
      }

      if (selectedClass !== "all") {
        filtered = filtered.filter(ship => ship.class === selectedClass);
      }

      if (selectedManufacturer !== "all") {
        filtered = filtered.filter(ship => ship.manufacturer === selectedManufacturer);
      }

      if (excludeNPCShips) {
        filtered = filtered.filter(ship => 
          ship.manufacturer !== "Xenon" && ship.manufacturer !== "Kha'ak"
        );
      }

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
  }, [debouncedSearch, selectedClass, selectedManufacturer, sortConfig, excludeNPCShips, isLoading]);

  // Get current page ships
  const currentShips = useMemo(() => {
    const start = currentPage * SHIPS_PER_PAGE;
    return filteredAndSortedShips.slice(start, start + SHIPS_PER_PAGE);
  }, [filteredAndSortedShips, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedShips.length / SHIPS_PER_PAGE);

  // Clear all filters - memoized to prevent recreation
  const clearFilters = useCallback(() => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedClass("all");
    setSelectedManufacturer("all");
    setExcludeNPCShips(false);
    setSortConfig({ field: null, direction: "asc" });
    setCurrentPage(0);
  }, []);

  // Active filters count
  const activeFiltersCount = useMemo(() => [
    debouncedSearch !== "",
    selectedClass !== "all",
    selectedManufacturer !== "all",
    excludeNPCShips,
    sortConfig.field !== null,
  ].filter(Boolean).length, [debouncedSearch, selectedClass, selectedManufacturer, excludeNPCShips, sortConfig.field]);

  // Handle pagination
  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Ships Database</h1>
          <p className="text-white/80">
            Browse and compare ships available in X4: Foundations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[300px]">
              <Input
                placeholder="Search ship names..."
                value={search}
                onChange={handleSearchChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 pr-10"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setDebouncedSearch("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              variant={showFilters ? "secondary" : "outline"}
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                className="text-sm text-primary/80 hover:text-primary"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Select 
                    value={selectedClass} 
                    onValueChange={(value) => {
                      setSelectedClass(value as ShipClass | "all");
                      setCurrentPage(0);
                    }}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Filter by class" />
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
                      setCurrentPage(0);
                    }}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Filter by manufacturer" />
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="exclude-npc"
                    checked={excludeNPCShips}
                    onCheckedChange={(checked) => {
                      setExcludeNPCShips(checked as boolean);
                      setCurrentPage(0);
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Summary */}
          <div className="flex flex-wrap items-center gap-2 min-h-8 text-sm">
            <span className="text-primary font-medium">
              {filteredAndSortedShips.length} ships found
            </span>
            {(selectedClass !== "all" || selectedManufacturer !== "all" || debouncedSearch || excludeNPCShips) && (
              <>
                <span className="text-white/50">•</span>
                <div className="flex flex-wrap gap-2">
                  {selectedClass !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedClass}
                      <button onClick={() => setSelectedClass("all")}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedManufacturer !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedManufacturer}
                      <button onClick={() => setSelectedManufacturer("all")}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {debouncedSearch && (
                    <Badge variant="secondary" className="gap-1">
                      Search: {debouncedSearch}
                      <button onClick={() => {
                        setSearch("");
                        setDebouncedSearch("");
                      }}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {excludeNPCShips && (
                    <Badge variant="secondary" className="gap-1">
                      No NPC Ships
                      <button onClick={() => setExcludeNPCShips(false)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Ships Grid */}
          <div className="relative min-h-[400px]">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentShips.map((ship) => (
                    <motion.div
                      key={ship.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="group"
                    >
                      <ShipCard ship={ship} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={prevPage}
                      disabled={currentPage === 0}
                      className="gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm text-white">
                      Page {currentPage + 1} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={nextPage}
                      disabled={currentPage === totalPages - 1}
                      className="gap-2"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}