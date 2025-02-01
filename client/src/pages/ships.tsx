import { ShipTable } from "@/components/ships/ship-table";

export default function Ships() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Ships Database</h1>
        <p className="text-muted-foreground">
          Browse and compare ships available in X4: Foundations
        </p>
      </div>
      <ShipTable />
    </div>
  );
}
