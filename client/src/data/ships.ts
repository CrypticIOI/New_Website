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
  },
  {
    id: "nova",
    name: "Nova Raider",
    class: "Heavy Fighter",
    size: "S",
    price: 198_450,
    crew: 2,
    cargo: 30,
    speed: 235,
    manufacturer: "Split Dynasty"
  },
  {
    id: "pegasus",
    name: "Pegasus Sentinel",
    class: "Corvette",
    size: "M",
    price: 892_750,
    crew: 15,
    cargo: 250,
    speed: 175,
    manufacturer: "Teladi Company"
  },
  {
    id: "cerberus",
    name: "Cerberus Sentinel",
    class: "Frigate",
    size: "M",
    price: 1_456_800,
    crew: 45,
    cargo: 750,
    speed: 145,
    manufacturer: "Argon Federation"
  },
  {
    id: "nemesis",
    name: "Nemesis Vanguard",
    class: "Destroyer",
    size: "L",
    price: 4_785_200,
    crew: 85,
    cargo: 1250,
    speed: 95,
    manufacturer: "Paranid"
  },
  {
    id: "phoenix",
    name: "Phoenix Carrier",
    class: "Carrier",
    size: "XL",
    price: 12_450_000,
    crew: 350,
    cargo: 2500,
    speed: 75,
    manufacturer: "Split Dynasty"
  },
  {
    id: "mercury",
    name: "Mercury Hauler",
    class: "Trader",
    size: "M",
    price: 425_750,
    crew: 8,
    cargo: 2750,
    speed: 155,
    manufacturer: "Teladi Company"
  },
  {
    id: "magnetar",
    name: "Magnetar Miner",
    class: "Miner",
    size: "M",
    price: 385_900,
    crew: 12,
    cargo: 2250,
    speed: 135,
    manufacturer: "Argon Federation"
  },
  {
    id: "raptor",
    name: "Raptor Scout",
    class: "Scout",
    size: "S",
    price: 82_450,
    crew: 1,
    cargo: 45,
    speed: 255,
    manufacturer: "Split Dynasty"
  },
  {
    id: "hawk",
    name: "Hawk Fighter",
    class: "Fighter",
    size: "S",
    price: 156_800,
    crew: 2,
    cargo: 20,
    speed: 275,
    manufacturer: "Argon Federation"
  },
  {
    id: "dragon",
    name: "Dragon Raider",
    class: "Heavy Fighter",
    size: "S",
    price: 212_750,
    crew: 2,
    cargo: 35,
    speed: 225,
    manufacturer: "Split Dynasty"
  }
];