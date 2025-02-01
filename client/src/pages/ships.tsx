import { ShipTable } from "@/components/ships/ship-table";

export default function Ships() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Ships Database</h1>
        <p className="text-white/80">
          Browse and compare ships available in X4: Foundations
        </p>
      </div>
      <ShipTable />
    </div>
  );
}