import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function Stations() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Station Calculator</h1>
        <p className="text-white/80">
          Calculate resources needed for your station builds
        </p>
      </div>

      <Card className="bg-white/10 border-white/10">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Construction className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Coming Soon</h2>
        </CardContent>
      </Card>
    </div>
  );
}