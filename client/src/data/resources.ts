export interface Resource {
  id: string;
  name: string;
  basePrice: number;
  category: ResourceCategory;
}

export type ResourceCategory = 
  | "Raw Material"
  | "Intermediate"
  | "Advanced"
  | "High Tech"
  | "Consumer";

export const resources: Resource[] = [
  {
    id: "energy_cells",
    name: "Energy Cells",
    basePrice: 16,
    category: "Raw Material"
  },
  {
    id: "graphene",
    name: "Graphene",
    basePrice: 190,
    category: "Intermediate"
  }
  // Add more resources as needed
];
