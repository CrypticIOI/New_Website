export interface ModuleType {
  id: string;
  name: string;
  category: string;
  cost: number;
  resources: Record<string, number>;
}

export const stationModules: ModuleType[] = [
  {
    id: "energy_cell_prod",
    name: "Energy Cell Production",
    category: "Production",
    cost: 419_742,
    resources: {
      "hull_parts": 112,
      "energy_cells": 250
    }
  },
  {
    id: "graphene_prod",
    name: "Graphene Production",
    category: "Production", 
    cost: 892_156,
    resources: {
      "hull_parts": 225,
      "energy_cells": 400
    }
  }
  // Add more modules as needed
];
