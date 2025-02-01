import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { type ShipClass } from "@/data/ships";
import { memo } from "react";

interface ShipFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedClass: ShipClass | "all";
  onClassChange: (value: ShipClass | "all") => void;
  selectedManufacturer: string;
  onManufacturerChange: (value: string) => void;
  excludeNPCShips: boolean;
  onExcludeNPCChange: (value: boolean) => void;
  manufacturers: string[];
  shipClasses: ShipClass[];
  totalShips: number;
}

export const ShipFilters = memo(function ShipFilters({
  search,
  onSearchChange,
  selectedClass,
  onClassChange,
  selectedManufacturer,
  onManufacturerChange,
  excludeNPCShips,
  onExcludeNPCChange,
  manufacturers,
  shipClasses,
  totalShips
}: ShipFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="Search ships or manufacturers..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm bg-white/5 border-white/10 text-white placeholder:text-white/50"
        />
        <div className="flex gap-4">
          <Select value={selectedClass} onValueChange={onClassChange}>
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

          <Select value={selectedManufacturer} onValueChange={onManufacturerChange}>
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
          onCheckedChange={(checked) => onExcludeNPCChange(checked as boolean)}
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
          {totalShips.toLocaleString()} ships found
          {selectedClass !== "all" && ` • Class: ${selectedClass}`}
          {selectedManufacturer !== "all" && ` • Manufacturer: ${selectedManufacturer}`}
          {search && ` • Search: "${search}"`}
          {excludeNPCShips && ` • Excluding NPC ships`}
        </div>
      </div>
    </div>
  );
});
