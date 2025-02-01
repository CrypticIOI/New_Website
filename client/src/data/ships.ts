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
  | "Resupply";

export const ships: Ship[] = [
  // Argon Federation Ships
  {
    id: "argon_eclipse",
    name: "Eclipse Vanguard",
    class: "Fighter",
    size: "S",
    price: 149_850,
    crew: 2,
    cargo: 25,
    speed: 245,
    manufacturer: "Argon Federation"
  },
  {
    id: "argon_nova",
    name: "Nova Vanguard",
    class: "Scout",
    size: "S",
    price: 76_230,
    crew: 1,
    cargo: 45,
    speed: 260,
    manufacturer: "Argon Federation"
  },
  {
    id: "mercury_vanguard",
    name: "Mercury Vanguard",
    class: "Transport",
    size: "M",
    price: 389_760,
    crew: 15,
    cargo: 2450,
    speed: 125,
    manufacturer: "Argon Federation"
  },
  {
    id: "cerberus_sentinel",
    name: "Cerberus Sentinel",
    class: "Frigate",
    size: "M",
    price: 1_485_000,
    crew: 40,
    cargo: 720,
    speed: 142,
    manufacturer: "Argon Federation"
  },
  // Adding more ships...
  {
    id: "osaka_sentinel",
    name: "Osaka Sentinel",
    class: "Destroyer",
    size: "L",
    price: 4_950_000,
    crew: 85,
    cargo: 1250,
    speed: 95,
    manufacturer: "Argon Federation"
  },

  // Split Dynasty Ships
  {
    id: "dragon_raider",
    name: "Dragon Raider",
    class: "Fighter",
    size: "S",
    price: 168_750,
    crew: 2,
    cargo: 22,
    speed: 275,
    manufacturer: "Split Dynasty"
  },
  {
    id: "python_raider",
    name: "Python Raider",
    class: "Scout",
    size: "S",
    price: 82_500,
    crew: 1,
    cargo: 40,
    speed: 285,
    manufacturer: "Split Dynasty"
  },
  {
    id: "rattlesnake",
    name: "Rattlesnake",
    class: "Destroyer",
    size: "L",
    price: 5_250_000,
    crew: 95,
    cargo: 1400,
    speed: 98,
    manufacturer: "Split Dynasty"
  },

  // Paranid Ships
  {
    id: "nemesis_sentinel",
    name: "Nemesis Sentinel",
    class: "Corvette",
    size: "M",
    price: 948_750,
    crew: 18,
    cargo: 275,
    speed: 165,
    manufacturer: "Paranid"
  },
  {
    id: "odysseus",
    name: "Odysseus",
    class: "Carrier",
    size: "XL",
    price: 12_750_000,
    crew: 375,
    cargo: 2850,
    speed: 62,
    manufacturer: "Paranid"
  },

  // Teladi Ships
  {
    id: "buzzard_vanguard",
    name: "Buzzard Vanguard",
    class: "Fighter",
    size: "S",
    price: 157_500,
    crew: 2,
    cargo: 28,
    speed: 240,
    manufacturer: "Teladi Company"
  },
  {
    id: "phoenix_sentinel",
    name: "Phoenix Sentinel",
    class: "Carrier",
    size: "XL",
    price: 13_125_000,
    crew: 385,
    cargo: 2950,
    speed: 60,
    manufacturer: "Teladi Company"
  },

  // Terran Ships
  {
    id: "katana",
    name: "Katana",
    class: "Fighter",
    size: "S",
    price: 165_000,
    crew: 2,
    cargo: 24,
    speed: 270,
    manufacturer: "Terran"
  },
  {
    id: "tokyo",
    name: "Tokyo",
    class: "Carrier",
    size: "XL",
    price: 14_250_000,
    crew: 420,
    cargo: 3200,
    speed: 58,
    manufacturer: "Terran"
  },

  // Xenon Ships
  {
    id: "xenon_k",
    name: "Xenon K",
    class: "Fighter",
    size: "S",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 280,
    manufacturer: "Xenon"
  },
  {
    id: "xenon_i",
    name: "Xenon I",
    class: "Carrier",
    size: "XL",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 55,
    manufacturer: "Xenon"
  }
];
