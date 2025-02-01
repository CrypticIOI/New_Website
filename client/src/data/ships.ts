import { z } from "zod";

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
  | "Miner"
  | "Auxiliary"
  | "Gunship"
  | "Transport";

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
    id: "nova_vanguard",
    name: "Nova Vanguard",
    class: "Heavy Fighter",
    size: "S",
    price: 198_450,
    crew: 3,
    cargo: 35,
    speed: 235,
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
  {
    id: "hermes_vanguard",
    name: "Hermes Vanguard",
    class: "Transport",
    size: "M",
    price: 385_900,
    crew: 12,
    cargo: 2250,
    speed: 135,
    manufacturer: "Argon Federation"
  },

  // Paranid Ships
  {
    id: "perseus_sentinel",
    name: "Perseus Sentinel",
    class: "Scout",
    size: "S",
    price: 78_500,
    crew: 2,
    cargo: 45,
    speed: 250,
    manufacturer: "Paranid"
  },
  {
    id: "perseus_vanguard",
    name: "Perseus Vanguard",
    class: "Scout",
    size: "S",
    price: 82_450,
    crew: 2,
    cargo: 48,
    speed: 255,
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
  {
    id: "odysseus_vanguard",
    name: "Odysseus Vanguard",
    class: "Carrier",
    size: "XL",
    price: 12_250_000,
    crew: 360,
    cargo: 2600,
    speed: 65,
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
    id: "cobra_raider",
    name: "Cobra Raider",
    class: "Corvette",
    size: "M",
    price: 985_000,
    crew: 20,
    cargo: 300,
    speed: 175,
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
  {
    id: "raptor_raider",
    name: "Raptor Raider",
    class: "Scout",
    size: "S",
    price: 82_450,
    crew: 1,
    cargo: 45,
    speed: 255,
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
  {
    id: "osprey_sentinel",
    name: "Osprey Sentinel",
    class: "Fighter",
    size: "S",
    price: 145_800,
    crew: 2,
    cargo: 35,
    speed: 250,
    manufacturer: "Teladi Company"
  },
    {
    id: "condor_hauler",
    name: "Condor Hauler",
    class: "Transport",
    size: "L",
    price: 3_250_000,
    crew: 30,
    cargo: 7000,
    speed: 115,
    manufacturer: "Teladi Company"
  },

  // Terran Ships
  {
    id: "katana",
    name: "Katana",
    class: "Fighter",
    size: "S",
    price: 155_000,
    crew: 2,
    cargo: 25,
    speed: 270,
    manufacturer: "Terran"
  },
  {
    id: "kukri",
    name: "Kukri",
    class: "Heavy Fighter",
    size: "S",
    price: 225_000,
    crew: 2,
    cargo: 30,
    speed: 240,
    manufacturer: "Terran"
  },
  {
    id: "osaka",
    name: "Osaka",
    class: "Destroyer",
    size: "L",
    price: 5_250_000,
    crew: 90,
    cargo: 1400,
    speed: 85,
    manufacturer: "Terran"
  },
  {
    id: "tokyo",
    name: "Tokyo",
    class: "Carrier",
    size: "XL",
    price: 13_500_000,
    crew: 380,
    cargo: 2800,
    speed: 60,
    manufacturer: "Terran"
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
  },
  {
    id: "mineral_miner",
    name: "Mineral Miner",
    class: "Miner",
    size: "M",
    price: 405_000,
    crew: 14,
    cargo: 2600,
    speed: 125,
    manufacturer: "Teladi Company"
  },

  // Xenon Ships
  {
    id: "xenon_p",
    name: "Xenon P",
    class: "Fighter",
    size: "S",
    price: 0, // Cannot be purchased
    crew: 0,
    cargo: 0,
    speed: 280,
    manufacturer: "Xenon"
  },
  {
    id: "xenon_n",
    name: "Xenon N",
    class: "Destroyer",
    size: "L",
    price: 0, // Cannot be purchased
    crew: 0,
    cargo: 0,
    speed: 100,
    manufacturer: "Xenon"
  },
  {
    id: "xenon_k",
    name: "Xenon K",
    class: "Carrier",
    size: "XL",
    price: 0, // Cannot be purchased
    crew: 0,
    cargo: 0,
    speed: 70,
    manufacturer: "Xenon"
  },
  // Additional Argon Ships
  {
    id: "ares_vanguard",
    name: "Ares Vanguard",
    class: "Gunship",
    size: "M",
    price: 1_250_000,
    crew: 25,
    cargo: 450,
    speed: 160,
    manufacturer: "Argon Federation"
  },
  {
    id: "atlas_vanguard",
    name: "Atlas Vanguard",
    class: "Transport",
    size: "L",
    price: 2_950_000,
    crew: 28,
    cargo: 6800,
    speed: 125,
    manufacturer: "Argon Federation"
  },

  // Additional Paranid Ships
  {
    id: "theseus_sentinel",
    name: "Theseus Sentinel",
    class: "Gunship",
    size: "M",
    price: 1_350_000,
    crew: 28,
    cargo: 480,
    speed: 155,
    manufacturer: "Paranid"
  },
  {
    id: "hercules_sentinel",
    name: "Hercules Sentinel",
    class: "Transport",
    size: "L",
    price: 3_150_000,
    crew: 32,
    cargo: 7200,
    speed: 120,
    manufacturer: "Paranid"
  },

  // Additional Split Ships
  {
    id: "panther_raider",
    name: "Panther Raider",
    class: "Gunship",
    size: "M",
    price: 1_450_000,
    crew: 30,
    cargo: 420,
    speed: 170,
    manufacturer: "Split Dynasty"
  },
  {
    id: "mammoth_raider",
    name: "Mammoth Raider",
    class: "Transport",
    size: "L",
    price: 3_350_000,
    crew: 35,
    cargo: 7500,
    speed: 115,
    manufacturer: "Split Dynasty"
  },

  // Additional Terran Ships
  {
    id: "gladius",
    name: "Gladius",
    class: "Scout",
    size: "S",
    price: 85_000,
    crew: 1,
    cargo: 40,
    speed: 265,
    manufacturer: "Terran"
  },
  {
    id: "syndicate",
    name: "Syndicate",
    class: "Auxiliary",
    size: "M",
    price: 750_000,
    crew: 15,
    cargo: 1800,
    speed: 145,
    manufacturer: "Terran"
  },
  {
    id: "kyoto",
    name: "Kyoto",
    class: "Transport",
    size: "L",
    price: 3_450_000,
    crew: 40,
    cargo: 8000,
    speed: 110,
    manufacturer: "Terran"
  },

  // ZYA Ships
  {
    id: "asp_raider",
    name: "Asp Raider",
    class: "Scout",
    size: "S",
    price: 79_500,
    crew: 2,
    cargo: 45,
    speed: 250,
    manufacturer: "ZYA"
  },
  {
    id: "python_sentinel",
    name: "Python Sentinel",
    class: "Fighter",
    size: "S",
    price: 158_000,
    crew: 2,
    cargo: 30,
    speed: 255,
    manufacturer: "ZYA"
  },
  {
    id: "rattlesnake",
    name: "Rattlesnake",
    class: "Destroyer",
    size: "L",
    price: 5_150_000,
    crew: 95,
    cargo: 1350,
    speed: 88,
    manufacturer: "ZYA"
  },

  // Additional Xenon Ships
  {
    id: "xenon_m",
    name: "Xenon M",
    class: "Gunship",
    size: "M",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 190,
    manufacturer: "Xenon"
  },
  {
    id: "xenon_i",
    name: "Xenon I",
    class: "Fighter",
    size: "S",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 290,
    manufacturer: "Xenon"
  },
    // Additional Xenon Ships
  {
    id: "xenon_j",
    name: "Xenon J",
    class: "Scout",
    size: "S",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 300,
    manufacturer: "Xenon"
  },
  {
    id: "xenon_q",
    name: "Xenon Q",
    class: "Frigate",
    size: "M",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 150,
    manufacturer: "Xenon"
  },

  // Additional Terran Ships
  {
    id: "asgard",
    name: "Asgard",
    class: "Destroyer",
    size: "XL",
    price: 15_500_000,
    crew: 450,
    cargo: 3200,
    speed: 55,
    manufacturer: "Terran"
  },
  {
    id: "syn",
    name: "Syn",
    class: "Frigate",
    size: "M",
    price: 1_850_000,
    crew: 35,
    cargo: 850,
    speed: 140,
    manufacturer: "Terran"
  },

  // Additional Split Ships
  {
    id: "buffalo_raider",
    name: "Buffalo Raider",
    class: "Transport",
    size: "L",
    price: 3_250_000,
    crew: 38,
    cargo: 7800,
    speed: 112,
    manufacturer: "Split Dynasty"
  },
  {
    id: "python_raider",
    name: "Python Raider",
    class: "Fighter",
    size: "S",
    price: 165_000,
    crew: 2,
    cargo: 28,
    speed: 258,
    manufacturer: "Split Dynasty"
  },

  // VIG Ships
  {
    id: "vig_moreya",
    name: "Moreya",
    class: "Scout",
    size: "S",
    price: 95_000,
    crew: 2,
    cargo: 35,
    speed: 270,
    manufacturer: "VIG"
  },
  {
    id: "vig_baldric",
    name: "Baldric",
    class: "Fighter",
    size: "S",
    price: 175_000,
    crew: 2,
    cargo: 25,
    speed: 265,
    manufacturer: "VIG"
  },

  // Additional Paranid Ships
  {
    id: "hyperion_vanguard",
    name: "Hyperion Vanguard",
    class: "Corvette",
    size: "M",
    price: 985_000,
    crew: 22,
    cargo: 320,
    speed: 172,
    manufacturer: "Paranid"
  },
  {
    id: "zeus_vanguard",
    name: "Zeus Vanguard",
    class: "Destroyer",
    size: "L",
    price: 5_150_000,
    crew: 92,
    cargo: 1450,
    speed: 92,
    manufacturer: "Paranid"
  },

  // Additional Teladi Ships
  {
    id: "falcon_sentinel",
    name: "Falcon Sentinel",
    class: "Fighter",
    size: "S",
    price: 148_500,
    crew: 2,
    cargo: 32,
    speed: 248,
    manufacturer: "Teladi Company"
  },
  {
    id: "phoenix_sentinel",
    name: "Phoenix Sentinel",
    class: "Carrier",
    size: "XL",
    price: 12_150_000,
    crew: 355,
    cargo: 2550,
    speed: 68,
    manufacturer: "Teladi Company"
  }
];