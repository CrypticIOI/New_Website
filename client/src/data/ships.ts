// Ship types and interface definitions
export interface Ship {
  id: string;
  name: string;
  class: ShipClass;
  size: ShipSize;
  price: number;
  crew: number;
  cargo: number;
  speed: number;
  manufacturer: string;
}

export type ShipSize = "S" | "M" | "L" | "XL";

export type ShipClass = 
  | "Scout"
  | "Fighter"
  | "Heavy Fighter"
  | "Interceptor"
  | "Corvette"
  | "Frigate"
  | "Destroyer"
  | "Carrier"
  | "Auxiliary"
  | "Transport"
  | "Trader"
  | "Miner"
  | "Resupply"
  | "Builder";

export const ships: Ship[] = [
  // Argon Federation Ships
  {
    id: "albatross_sentinel",
    name: "Albatross Sentinel",
    class: "Builder",
    size: "XL",
    price: 10_948_470,
    crew: 182,
    cargo: 50,
    speed: 41,
    manufacturer: "Teladi Company"
  },
  {
    id: "albatross_vanguard",
    name: "Albatross Vanguard",
    class: "Builder",
    size: "XL",
    price: 9_123_765,
    crew: 219,
    cargo: 50,
    speed: 47,
    manufacturer: "Teladi Company"
  },
  {
    id: "alligator_gas",
    name: "Alligator (Gas)",
    class: "Miner",
    size: "M",
    price: 212_670,
    crew: 8,
    cargo: 7600,
    speed: 669,
    manufacturer: "Split Dynasty"
  },
  {
    id: "alligator_mineral",
    name: "Alligator (Mineral)",
    class: "Miner",
    size: "M",
    price: 236_300,
    crew: 8,
    cargo: 7000,
    speed: 618,
    manufacturer: "Split Dynasty"
  },
  {
    id: "ares",
    name: "Ares",
    class: "Heavy Fighter",
    size: "S",
    price: 243_540,
    crew: 2,
    cargo: 270,
    speed: 148,
    manufacturer: "Paranid"
  },
  {
    id: "asgard",
    name: "Asgard",
    class: "Destroyer",
    size: "XL",
    price: 26_179_920,
    crew: 360,
    cargo: 9000,
    speed: 70,
    manufacturer: "Terran Protectorate"
  },
  {
    id: "asp",
    name: "Asp",
    class: "Fighter",
    size: "S",
    price: 255_275,
    crew: 2,
    cargo: 170,
    speed: 304,
    manufacturer: "Split Dynasty"
  },
  {
    id: "asp_raider",
    name: "Asp Raider",
    class: "Fighter",
    size: "S",
    price: 123_940,
    crew: 1,
    cargo: 100,
    speed: 319,
    manufacturer: "Split Dynasty"
  },
  {
    id: "astrid",
    name: "Astrid",
    class: "Transport",
    size: "M",
    price: 2_170_000,
    crew: 16,
    cargo: 4300,
    speed: 317,
    manufacturer: "Generic"
  },
  // Continue with more ships...
  {
    id: "atlas_e",
    name: "Atlas E",
    class: "Resupply",
    size: "XL",
    price: 15_457_615,
    crew: 258,
    cargo: 34040,
    speed: 110,
    manufacturer: "Paranid"
  }
  // I'll continue adding more ships in subsequent updates to avoid making the response too long
];