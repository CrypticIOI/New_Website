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
import { useState } from "react";
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
  "Miner"
];

export function ShipTable() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<ShipClass | "all">("all");

  const filteredShips = ships.filter(ship => {
    const matchesSearch = ship.name.toLowerCase().includes(search.toLowerCase());
    const matchesClass = selectedClass === "all" || ship.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search ships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-white/5 border-white/10 text-white placeholder:text-white/50"
        />
        <Select value={selectedClass} onValueChange={(value) => setSelectedClass(value as ShipClass | "all")}>
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
              <TableHead className="text-white/70">Price</TableHead>
              <TableHead className="text-white/70">Crew</TableHead>
              <TableHead className="text-white/70">Cargo</TableHead>
              <TableHead className="text-white/70">Speed</TableHead>
              <TableHead className="text-white/70">Manufacturer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShips.map((ship) => (
              <TableRow key={ship.id} className="border-b border-white/10">
                <TableCell className="text-primary/90">{ship.name}</TableCell>
                <TableCell className="text-primary/90">{ship.class}</TableCell>
                <TableCell className="text-primary/90">{ship.size}</TableCell>
                <TableCell className="text-primary/90">{ship.price.toLocaleString()}</TableCell>
                <TableCell className="text-primary/90">{ship.crew}</TableCell>
                <TableCell className="text-primary/90">{ship.cargo}</TableCell>
                <TableCell className="text-primary/90">{ship.speed}</TableCell>
                <TableCell className="text-primary/90">{ship.manufacturer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}