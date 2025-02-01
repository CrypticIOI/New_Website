import { useState, useMemo, useEffect } from "react";
import { ships, type Ship, type ShipClass } from "@/data/ships";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const CHUNK_SIZE = 20; // Number of ships to load at once

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
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll handler for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
        setVisibleCount(prev => Math.min(prev + CHUNK_SIZE, filteredAndSortedShips.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(CHUNK_SIZE);
  }, [search, selectedClass, selectedManufacturer, excludeNPCShips, sortConfig]);

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

  // Visible ships
  const visibleShips = useMemo(() => 
    filteredAndSortedShips.slice(0, visibleCount)
  , [filteredAndSortedShips, visibleCount]);

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setSelectedClass("all");
    setSelectedManufacturer("all");
    setExcludeNPCShips(false);
    setSortConfig({ field: null, direction: "asc" });
  };

  // Active filters count
  const activeFiltersCount = [
    search !== "",
    selectedClass !== "all",
    selectedManufacturer !== "all",
    excludeNPCShips,
    sortConfig.field !== null,
  ].filter(Boolean).length;

  return (
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
              placeholder="Search ships or manufacturers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 pr-10"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
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
              className="space-y-4 overflow-hidden"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Select 
                  value={selectedClass} 
                  onValueChange={(value) => setSelectedClass(value as ShipClass | "all")}
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
                  onValueChange={setSelectedManufacturer}
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Summary */}
        <div className="flex flex-wrap items-center gap-2 min-h-8 text-sm">
          <span className="text-primary font-medium">
            {filteredAndSortedShips.length} ships found
          </span>
          {(selectedClass !== "all" || selectedManufacturer !== "all" || search || excludeNPCShips) && (
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
                {search && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {search}
                    <button onClick={() => setSearch("")}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {visibleShips.map((ship) => (
                <motion.div
                  key={ship.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
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
                </motion.div>
              ))}
            </div>
          )}
          {visibleCount < filteredAndSortedShips.length && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setVisibleCount(prev => prev + CHUNK_SIZE)}
                className="gap-2"
              >
                Load More Ships
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}