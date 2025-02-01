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
  // Argon Federation Ships
  {
    id: "discoverer_vanguard",
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
    id: "elite_vanguard",
    name: "Elite Vanguard",
    class: "Fighter",
    size: "S",
    price: 142_500,
    crew: 2,
    cargo: 30,
    speed: 260,
    manufacturer: "Argon Federation"
  },
  {
    id: "cerberus_sentinel",
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
    id: "behemoth_vanguard",
    name: "Behemoth Vanguard",
    class: "Destroyer",
    size: "L",
    price: 4_950_000,
    crew: 80,
    cargo: 1200,
    speed: 90,
    manufacturer: "Argon Federation"
  },
  {
    id: "colossus_vanguard",
    name: "Colossus Vanguard",
    class: "Carrier",
    size: "XL",
    price: 11_850_000,
    crew: 340,
    cargo: 2400,
    speed: 70,
    manufacturer: "Argon Federation"
  },

  // Paranid Ships
  {
    id: "perseus_vanguard",
    name: "Perseus Vanguard",
    class: "Scout",
    size: "S",
    price: 78_500,
    crew: 2,
    cargo: 45,
    speed: 250,
    manufacturer: "Paranid"
  },
  {
    id: "eclipse_vanguard",
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
    id: "nemesis_vanguard",
    name: "Nemesis Vanguard",
    class: "Destroyer",
    size: "L",
    price: 4_785_200,
    crew: 85,
    cargo: 1250,
    speed: 95,
    manufacturer: "Paranid"
  },

  // Split Dynasty Ships
  {
    id: "nova_raider",
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
    id: "dragon_raider",
    name: "Dragon Raider",
    class: "Heavy Fighter",
    size: "S",
    price: 212_750,
    crew: 2,
    cargo: 35,
    speed: 225,
    manufacturer: "Split Dynasty"
  },
  {
    id: "tiger_raider",
    name: "Tiger Raider",
    class: "Corvette",
    size: "M",
    price: 950_000,
    crew: 18,
    cargo: 280,
    speed: 180,
    manufacturer: "Split Dynasty"
  },
  {
    id: "phoenix_carrier",
    name: "Phoenix Carrier",
    class: "Carrier",
    size: "XL",
    price: 12_450_000,
    crew: 350,
    cargo: 2500,
    speed: 75,
    manufacturer: "Split Dynasty"
  },

  // Teladi Company Ships
  {
    id: "kestrel_vanguard",
    name: "Kestrel Vanguard",
    class: "Scout",
    size: "S",
    price: 72_000,
    crew: 2,
    cargo: 55,
    speed: 240,
    manufacturer: "Teladi Company"
  },
  {
    id: "pegasus_sentinel",
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
    id: "mercury_hauler",
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
    id: "vulture_hauler",
    name: "Vulture Hauler",
    class: "Trader",
    size: "L",
    price: 2_850_000,
    crew: 25,
    cargo: 6500,
    speed: 120,
    manufacturer: "Teladi Company"
  },

  // Mining Ships
  {
    id: "magnetar_miner",
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
    id: "pulsar_miner",
    name: "Pulsar Miner",
    class: "Miner",
    size: "L",
    price: 2_450_000,
    crew: 35,
    cargo: 7500,
    speed: 110,
    manufacturer: "Paranid"
  },
  {
    id: "quasar_miner",
    name: "Quasar Miner",
    class: "Miner",
    size: "M",
    price: 395_000,
    crew: 15,
    cargo: 2400,
    speed: 130,
    manufacturer: "Split Dynasty"
  }
];