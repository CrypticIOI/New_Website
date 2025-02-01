import { useState } from "react";
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

  const addModule = (moduleId: string) => {
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
  };

  const removeModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.filter(m => m.id !== moduleId)
    );
  };

  const totalResources = selectedModules.reduce((acc, selected) => {
    const module = stationModules.find(m => m.id === selected.id);
    if (!module) return acc;

    Object.entries(module.resources).forEach(([resourceId, amount]) => {
      acc[resourceId] = (acc[resourceId] || 0) + amount * selected.quantity;
    });
    return acc;
  }, {} as Record<string, number>);

  const totalCost = selectedModules.reduce((acc, selected) => {
    const module = stationModules.find(m => m.id === selected.id);
    return acc + (module?.cost || 0) * selected.quantity;
  }, 0);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Add Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={addModule}>
              <SelectTrigger>
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
                  <div key={selected.id} className="flex items-center justify-between">
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

      <Card>
        <CardHeader>
          <CardTitle>Required Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(totalResources).map(([resourceId, amount]) => {
              const resource = resources.find(r => r.id === resourceId);
              return (
                <div key={resourceId} className="flex justify-between">
                  <span>{resource?.name || resourceId}</span>
                  <span>{amount.toLocaleString()}</span>
                </div>
              );
            })}
            <div className="pt-4 border-t">
              <div className="flex justify-between font-bold">
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
