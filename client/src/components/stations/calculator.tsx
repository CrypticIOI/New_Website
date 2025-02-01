import { useMemo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { stationModules } from "@/data/stations";
import { resources } from "@/data/resources";

interface SelectedModule {
  id: string;
  quantity: number;
}

export function StationCalculator() {
  const [selectedModules, setSelectedModules] = useState<SelectedModule[]>([]);

  // Memoize module selection handler
  const addModule = useCallback((moduleId: string) => {
    setSelectedModules(prev => {
      const existing = prev.find(m => m.id === moduleId);
      if (existing) {
        return prev.map(m => 
          m.id === moduleId 
            ? { ...m, quantity: m.quantity + 1 }
            : m
        );
      }
      return [...prev, { id: moduleId, quantity: 1 }];
    });
  }, []);

  // Memoize module removal handler
  const removeModule = useCallback((moduleId: string) => {
    setSelectedModules(prev => 
      prev.filter(m => m.id !== moduleId)
    );
  }, []);

  // Memoize calculations
  const { totalResources, totalCost } = useMemo(() => {
    const resources: Record<string, number> = {};
    let cost = 0;

    selectedModules.forEach(selected => {
      const module = stationModules.find(m => m.id === selected.id);
      if (!module) return;

      // Calculate resources
      Object.entries(module.resources).forEach(([resourceId, amount]) => {
        resources[resourceId] = (resources[resourceId] || 0) + amount * selected.quantity;
      });

      // Calculate cost
      cost += module.cost * selected.quantity;
    });

    return {
      totalResources: resources,
      totalCost: cost
    };
  }, [selectedModules]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-white/10 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Add Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={addModule}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select a module" />
              </SelectTrigger>
              <SelectContent>
                {stationModules.map(module => (
                  <SelectItem key={module.id} value={module.id}>
                    {module.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-2">
              {selectedModules.map(selected => {
                const module = stationModules.find(m => m.id === selected.id);
                if (!module) return null;
                return (
                  <div key={selected.id} className="flex items-center justify-between text-white">
                    <span>{module.name} x{selected.quantity}</span>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeModule(selected.id)}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Required Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(totalResources).map(([resourceId, amount]) => {
              const resource = resources.find(r => r.id === resourceId);
              return (
                <div key={resourceId} className="flex justify-between text-white">
                  <span>{resource?.name || resourceId}</span>
                  <span>{amount.toLocaleString()}</span>
                </div>
              );
            })}
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between font-bold text-white">
                <span>Total Cost</span>
                <span>{totalCost.toLocaleString()} Credits</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}