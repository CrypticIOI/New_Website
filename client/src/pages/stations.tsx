import { StationCalculator } from "@/components/stations/calculator";

export default function Stations() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Station Calculator</h1>
        <p className="text-white/80">
          Calculate resources needed for your station builds
        </p>
      </div>
      <StationCalculator />
    </div>
  );
}