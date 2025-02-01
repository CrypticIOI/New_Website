import { TradeMap } from "@/components/trade/trade-map";

export default function Trade() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Trade Routes</h1>
        <p className="text-muted-foreground">
          Visualize trade routes and resource flow
        </p>
      </div>
      <TradeMap />
    </div>
  );
}
