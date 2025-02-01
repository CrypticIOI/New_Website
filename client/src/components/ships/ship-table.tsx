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
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

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

type NumericFilter = {
  min: number;
  max: number;
};

export function ShipTable() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<ShipClass | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<NumericFilter>({ min: 0, max: Infinity });
  const [crewRange, setCrewRange] = useState<NumericFilter>({ min: 0, max: Infinity });
  const [cargoRange, setCargoRange] = useState<NumericFilter>({ min: 0, max: Infinity });
  const [speedRange, setSpeedRange] = useState<NumericFilter>({ min: 0, max: Infinity });

  // Get unique manufacturers
  const manufacturers = useMemo(() => {
    return [...new Set(ships.map(ship => ship.manufacturer))].sort();
  }, []);

  // Get ranges for numeric values
  const ranges = useMemo(() => {
    return ships.reduce((acc, ship) => {
      return {
        price: {
          min: Math.min(acc.price.min, ship.price),
          max: Math.max(acc.price.max, ship.price)
        },
        crew: {
          min: Math.min(acc.crew.min, ship.crew),
          max: Math.max(acc.crew.max, ship.crew)
        },
        cargo: {
          min: Math.min(acc.cargo.min, ship.cargo),
          max: Math.max(acc.cargo.max, ship.cargo)
        },
        speed: {
          min: Math.min(acc.speed.min, ship.speed),
          max: Math.max(acc.speed.max, ship.speed)
        }
      };
    }, {
      price: { min: Infinity, max: -Infinity },
      crew: { min: Infinity, max: -Infinity },
      cargo: { min: Infinity, max: -Infinity },
      speed: { min: Infinity, max: -Infinity }
    });
  }, []);

  // Memoize filtered ships to prevent recalculation on every render
  const filteredShips = useMemo(() => {
    return ships.filter(ship => {
      const matchesSearch = ship.name.toLowerCase().includes(search.toLowerCase()) ||
                          ship.manufacturer.toLowerCase().includes(search.toLowerCase());
      const matchesClass = selectedClass === "all" || ship.class === selectedClass;
      const matchesManufacturer = selectedManufacturer === "all" || ship.manufacturer === selectedManufacturer;
      const matchesPrice = ship.price >= priceRange.min && ship.price <= priceRange.max;
      const matchesCrew = ship.crew >= crewRange.min && ship.crew <= crewRange.max;
      const matchesCargo = ship.cargo >= cargoRange.min && ship.cargo <= cargoRange.max;
      const matchesSpeed = ship.speed >= speedRange.min && ship.speed <= speedRange.max;

      return matchesSearch && matchesClass && matchesManufacturer && 
             matchesPrice && matchesCrew && matchesCargo && matchesSpeed;
    });
  }, [search, selectedClass, selectedManufacturer, priceRange, crewRange, cargoRange, speedRange]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredShips.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedShips = filteredShips.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when filters change
  const resetPage = useCallback(() => setCurrentPage(1), []);

  // Handler for numeric range inputs
  const handleRangeChange = (
    setter: (range: NumericFilter) => void,
    value: number,
    isMin: boolean
  ) => {
    setter(prev => ({
      min: isMin ? value : prev.min,
      max: isMin ? prev.max : value
    }));
    resetPage();
  };

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
              <SelectValue placeholder="Ship class" />
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
              <SelectValue placeholder="Manufacturer" />
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

      {/* Numeric Filters */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Price Range */}
        <div className="space-y-2">
          <Label className="text-white">Price Range</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              className="bg-white/5 border-white/10 text-white"
              value={priceRange.min}
              onChange={(e) => handleRangeChange(setPriceRange, Number(e.target.value), true)}
            />
            <Input
              type="number"
              placeholder="Max"
              className="bg-white/5 border-white/10 text-white"
              value={priceRange.max === Infinity ? "" : priceRange.max}
              onChange={(e) => handleRangeChange(setPriceRange, Number(e.target.value) || Infinity, false)}
            />
          </div>
        </div>

        {/* Crew Range */}
        <div className="space-y-2">
          <Label className="text-white">Crew Size</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              className="bg-white/5 border-white/10 text-white"
              value={crewRange.min}
              onChange={(e) => handleRangeChange(setCrewRange, Number(e.target.value), true)}
            />
            <Input
              type="number"
              placeholder="Max"
              className="bg-white/5 border-white/10 text-white"
              value={crewRange.max === Infinity ? "" : crewRange.max}
              onChange={(e) => handleRangeChange(setCrewRange, Number(e.target.value) || Infinity, false)}
            />
          </div>
        </div>

        {/* Cargo Range */}
        <div className="space-y-2">
          <Label className="text-white">Cargo Capacity</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              className="bg-white/5 border-white/10 text-white"
              value={cargoRange.min}
              onChange={(e) => handleRangeChange(setCargoRange, Number(e.target.value), true)}
            />
            <Input
              type="number"
              placeholder="Max"
              className="bg-white/5 border-white/10 text-white"
              value={cargoRange.max === Infinity ? "" : cargoRange.max}
              onChange={(e) => handleRangeChange(setCargoRange, Number(e.target.value) || Infinity, false)}
            />
          </div>
        </div>

        {/* Speed Range */}
        <div className="space-y-2">
          <Label className="text-white">Speed</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              className="bg-white/5 border-white/10 text-white"
              value={speedRange.min}
              onChange={(e) => handleRangeChange(setSpeedRange, Number(e.target.value), true)}
            />
            <Input
              type="number"
              placeholder="Max"
              className="bg-white/5 border-white/10 text-white"
              value={speedRange.max === Infinity ? "" : speedRange.max}
              onChange={(e) => handleRangeChange(setSpeedRange, Number(e.target.value) || Infinity, false)}
            />
          </div>
        </div>
      </div>

      {/* Filter Summary */}
      <div className="text-sm text-primary/80">
        Showing {filteredShips.length} ships
        {selectedClass !== "all" && ` of class ${selectedClass}`}
        {selectedManufacturer !== "all" && ` from ${selectedManufacturer}`}
        {search && ` matching "${search}"`}
      </div>

      {/* Ship Table */}
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