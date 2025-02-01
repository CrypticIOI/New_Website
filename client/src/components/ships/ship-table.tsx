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
  const [selectedClass, setSelectedClass] = useState<ShipClass | "">("");

  const filteredShips = ships.filter(ship => {
    const matchesSearch = ship.name.toLowerCase().includes(search.toLowerCase());
    const matchesClass = !selectedClass || ship.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search ships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedClass} onValueChange={(value) => setSelectedClass(value as ShipClass)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ship class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All classes</SelectItem>
            {shipClasses.map(cls => (
              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Crew</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Speed</TableHead>
              <TableHead>Manufacturer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShips.map((ship) => (
              <TableRow key={ship.id}>
                <TableCell>{ship.name}</TableCell>
                <TableCell>{ship.class}</TableCell>
                <TableCell>{ship.size}</TableCell>
                <TableCell>{ship.price.toLocaleString()}</TableCell>
                <TableCell>{ship.crew}</TableCell>
                <TableCell>{ship.cargo}</TableCell>
                <TableCell>{ship.speed}</TableCell>
                <TableCell>{ship.manufacturer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
