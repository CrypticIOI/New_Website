import { TableCell, TableRow } from "@/components/ui/table";
import { memo } from "react";
import { type Ship } from "@/data/ships";

interface ShipTableRowProps {
  ship: Ship;
}

export const ShipTableRow = memo(function ShipTableRow({ ship }: ShipTableRowProps) {
  return (
    <TableRow className="border-b border-white/10 transition-colors hover:bg-white/5">
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
  );
});
