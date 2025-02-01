export interface Ship {
  id: string;
  name: string;
  class: ShipClass;
  size: string;
  price: number;
  crew: number;
  cargo: number;
  speed: number;
  manufacturer: string;
}

export type ShipClass = 
  | "Scout"
  | "Fighter"
  | "Heavy Fighter"
  | "Corvette"
  | "Frigate"
  | "Destroyer"
  | "Carrier"
  | "Trader"
  | "Miner";

export const ships: Ship[] = [
  {
    id: "discoverer",
    name: "Discoverer Vanguard",
    class: "Scout",
    size: "S",
    price: 76_825,
    crew: 2,
    cargo: 50,
    speed: 245,
    manufacturer: "Argon Federation"
  },
  {
    id: "eclipse",
    name: "Eclipse Vanguard",
    class: "Fighter",
    size: "S",
    price: 147_651,
    crew: 2,
    cargo: 25,
    speed: 265,
    manufacturer: "Paranid"
  }
  // Add more ships as needed
];
