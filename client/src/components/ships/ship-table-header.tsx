import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { memo } from "react";

export type SortField = "price" | "crew" | "cargo" | "speed";
export type SortDirection = "asc" | "desc";

export type SortConfig = {
  field: SortField | null;
  direction: SortDirection;
};

interface ShipTableHeaderProps {
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
}

export const ShipTableHeader = memo(function ShipTableHeader({ 
  sortConfig, 
  onSort 
}: ShipTableHeaderProps) {
  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? 
      <ArrowUp className="ml-2 h-4 w-4" /> : 
      <ArrowDown className="ml-2 h-4 w-4" />;
  };

  return (
    <TableHeader>
      <TableRow className="border-b border-white/10">
        <TableHead className="text-white/70">Name</TableHead>
        <TableHead className="text-white/70">Class</TableHead>
        <TableHead className="text-white/70">Size</TableHead>
        <TableHead 
          className="text-white/70 text-right cursor-pointer select-none"
          onClick={() => onSort("price")}
        >
          <div className="flex items-center justify-end">
            Price
            {getSortIcon("price")}
          </div>
        </TableHead>
        <TableHead 
          className="text-white/70 text-right cursor-pointer select-none"
          onClick={() => onSort("crew")}
        >
          <div className="flex items-center justify-end">
            Crew
            {getSortIcon("crew")}
          </div>
        </TableHead>
        <TableHead 
          className="text-white/70 text-right cursor-pointer select-none"
          onClick={() => onSort("cargo")}
        >
          <div className="flex items-center justify-end">
            Cargo
            {getSortIcon("cargo")}
          </div>
        </TableHead>
        <TableHead 
          className="text-white/70 text-right cursor-pointer select-none"
          onClick={() => onSort("speed")}
        >
          <div className="flex items-center justify-end">
            Speed
            {getSortIcon("speed")}
          </div>
        </TableHead>
        <TableHead className="text-white/70">Manufacturer</TableHead>
      </TableRow>
    </TableHeader>
  );
});
