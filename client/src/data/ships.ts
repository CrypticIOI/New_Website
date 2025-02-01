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
  },
  // Additional Split Patriarchy Ships
  {
    id: "dragon_sentinel",
    name: "Dragon Sentinel",
    class: "Heavy Fighter",
    size: "S",
    price: 215_750,
    crew: 2,
    cargo: 32,
    speed: 230,
    manufacturer: "Split Dynasty"
  },
  {
    id: "wyvern_sentinel",
    name: "Wyvern Sentinel",
    class: "Corvette",
    size: "M",
    price: 975_000,
    crew: 19,
    cargo: 290,
    speed: 178,
    manufacturer: "Split Dynasty"
  },

  // Additional Terran Ships
  {
    id: "takoba",
    name: "Takoba",
    class: "Auxiliary",
    size: "M",
    price: 725_000,
    crew: 12,
    cargo: 1600,
    speed: 150,
    manufacturer: "Terran"
  },
  {
    id: "shuriken",
    name: "Shuriken",
    class: "Scout",
    size: "S",
    price: 82_000,
    crew: 1,
    cargo: 42,
    speed: 268,
    manufacturer: "Terran"
  },

  // Free Families Ships
  {
    id: "free_families_asp",
    name: "Free Families Asp",
    class: "Scout",
    size: "S",
    price: 81_500,
    crew: 2,
    cargo: 46,
    speed: 252,
    manufacturer: "Free Families"
  },
  {
    id: "free_families_python",
    name: "Free Families Python",
    class: "Fighter",
    size: "S",
    price: 160_000,
    crew: 2,
    cargo: 31,
    speed: 257,
    manufacturer: "Free Families"
  },

  // Additional Paranid Ships
  {
    id: "gorgon_sentinel",
    name: "Gorgon Sentinel",
    class: "Heavy Fighter",
    size: "S",
    price: 205_000,
    crew: 2,
    cargo: 33,
    speed: 232,
    manufacturer: "Paranid"
  },
  {
    id: "medusa_vanguard",
    name: "Medusa Vanguard",
    class: "Frigate",
    size: "M",
    price: 1_525_000,
    crew: 48,
    cargo: 780,
    speed: 142,
    manufacturer: "Paranid"
  },
  // ALI Manufacturing Ships
  {
    id: "ali_constructor",
    name: "ALI Constructor",
    class: "Auxiliary",
    size: "L",
    price: 2_850_000,
    crew: 25,
    cargo: 5000,
    speed: 95,
    manufacturer: "ALI"
  },
  {
    id: "ali_mobile_factory",
    name: "ALI Mobile Factory",
    class: "Auxiliary",
    size: "XL",
    price: 8_500_000,
    crew: 85,
    cargo: 12000,
    speed: 75,
    manufacturer: "ALI"
  },

  // Additional Terran Ships
  {
    id: "terran_constructor",
    name: "Terran Constructor",
    class: "Auxiliary",
    size: "L",
    price: 3_150_000,
    crew: 28,
    cargo: 5500,
    speed: 90,
    manufacturer: "Terran"
  },
  {
    id: "terran_resupplier",
    name: "Terran Resupplier",
    class: "Auxiliary",
    size: "M",
    price: 850_000,
    crew: 15,
    cargo: 2200,
    speed: 140,
    manufacturer: "Terran"
  },

  // Yaki Ships
  {
    id: "yaki_kitsune",
    name: "Yaki Kitsune",
    class: "Fighter",
    size: "S",
    price: 168_000,
    crew: 2,
    cargo: 28,
    speed: 262,
    manufacturer: "Yaki"
  },
  {
    id: "yaki_oni",
    name: "Yaki Oni",
    class: "Heavy Fighter",
    size: "S",
    price: 215_000,
    crew: 2,
    cargo: 32,
    speed: 235,
    manufacturer: "Yaki"
  },
  {
    id: "yaki_tengu",
    name: "Yaki Tengu",
    class: "Corvette",
    size: "M",
    price: 950_000,
    crew: 18,
    cargo: 280,
    speed: 175,
    manufacturer: "Yaki"
  },

  // Boron Ships (Kingdom End DLC)
  {
    id: "boron_ray",
    name: "Boron Ray",
    class: "Scout",
    size: "S",
    price: 82_000,
    crew: 2,
    cargo: 45,
    speed: 260,
    manufacturer: "Boron"
  },
  {
    id: "boron_barracuda",
    name: "Boron Barracuda",
    class: "Fighter",
    size: "S",
    price: 155_000,
    crew: 2,
    cargo: 30,
    speed: 255,
    manufacturer: "Boron"
  },
  {
    id: "boron_dolphin",
    name: "Boron Dolphin",
    class: "Corvette",
    size: "M",
    price: 925_000,
    crew: 20,
    cargo: 300,
    speed: 170,
    manufacturer: "Boron"
  },
  {
    id: "boron_orca",
    name: "Boron Orca",
    class: "Destroyer",
    size: "L",
    price: 4_850_000,
    crew: 85,
    cargo: 1300,
    speed: 95,
    manufacturer: "Boron"
  },
  {
    id: "boron_megalodon",
    name: "Boron Megalodon",
    class: "Carrier",
    size: "XL",
    price: 12_500_000,
    crew: 360,
    cargo: 2700,
    speed: 65,
    manufacturer: "Boron"
  },
    // Additional Split Ships
  {
    id: "split_constructor",
    name: "Split Constructor",
    class: "Auxiliary",
    size: "L",
    price: 2_950_000,
    crew: 30,
    cargo: 5200,
    speed: 92,
    manufacturer: "Split Dynasty"
  },
    {
    id: "split_auxiliary",
    name: "Split Auxiliary",
    class: "Auxiliary",
    size: "M",
    price: 750_000,
    crew: 12,
    cargo: 1900,
    speed: 145,
    manufacturer: "Split Dynasty"
  },
  // Additional Yaki Ships
  {
    id: "yaki_raider",
    name: "Yaki Raider",
    class: "Fighter",
    size: "S",
    price: 172_000,
    crew: 2,
    cargo: 30,
    speed: 260,
    manufacturer: "Yaki"
  },
  {
    id: "yaki_phantom",
    name: "Yaki Phantom",
    class: "Scout",
    size: "S",
    price: 85_000,
    crew: 1,
    cargo: 40,
    speed: 275,
    manufacturer: "Yaki"
  },

  // Additional Boron Ships
  {
    id: "boron_marlin",
    name: "Boron Marlin",
    class: "Scout",
    size: "S",
    price: 78_000,
    crew: 2,
    cargo: 48,
    speed: 265,
    manufacturer: "Boron"
  },
  {
    id: "boron_mako",
    name: "Boron Mako",
    class: "Heavy Fighter",
    size: "S",
    price: 210_000,
    crew: 2,
    cargo: 35,
    speed: 240,
    manufacturer: "Boron"
  },
  {
    id: "boron_angel",
name: "Boron Angel",
    class: "Frigate",
    size: "M",
    price: 1_550_000,
    crew: 45,
    cargo: 800,
    speed: 140,
    manufacturer: "Boron"
  },

  // Additional Ships
  {
    id: "teladi_astrid",
    name: "Teladi Astrid",
    class: "Miner",
    size: "M",
    price: 398_000,
    crew: 15,
    cargo: 2500,
    speed: 128,
    manufacturer: "Teladi Company"
  },
  {
    id: "argon_astrid",
    name: "Argon Astrid",
    class: "Miner",
    size: "M",
    price: 392_000,
    crew: 14,
    cargo: 2450,
    speed: 132,
    manufacturer: "Argon Federation"
  },
  {
    id: "paranid_astrid",
    name: "Paranid Astrid",
    class: "Miner",
    size: "M",
    price: 395_000,
    crew: 15,
    cargo: 2480,
    speed: 130,
    manufacturer: "Paranid"
  },

  // Split Vendetta Geometric Ships
  {
    id: "split_geometric_tiger",
    name: "Geometric Tiger",
    class: "Corvette",
    size: "M",
    price: 965_000,
    crew: 19,
    cargo: 285,
    speed: 182,
    manufacturer: "Split Dynasty"
  },
  {
    id: "split_geometric_owl",
    name: "Geometric Owl",
    class: "Scout",
    size: "S",
    price: 84_000,
    crew: 1,
    cargo: 48,
    speed: 258,
    manufacturer: "Split Dynasty"
  },

  // Additional Mining Ships
  {
    id: "split_mineral_miner",
    name: "Split Mineral Miner",
    class: "Miner",
    size: "M",
    price: 388_000,
    crew: 13,
    cargo: 2350,
    speed: 138,
    manufacturer: "Split Dynasty"
  },
  {
    id: "terran_mineral_miner",
    name: "Terran Mineral Miner",
    class: "Miner",
    size: "M",
    price: 415_000,
    crew: 16,
    cargo: 2600,
    speed: 125,
    manufacturer: "Terran"
  },

  // Specialized Transport Variants
  {
    id: "argon_express",
    name: "Argon Express",
    class: "Transport",
    size: "M",
    price: 375_000,
    crew: 10,
    cargo: 2100,
    speed: 142,
    manufacturer: "Argon Federation"
  },
  {
    id: "paranid_pilgrim_hauler",
    name: "Paranid Pilgrim Hauler",
    class: "Transport",
    size: "L",
    price: 3_150_000,
    crew: 32,
    cargo: 7200,
    speed: 118,
    manufacturer: "Paranid"
  },
  // Additional Auxiliary Ships
  {
    id: "paranid_constructor",
    name: "Paranid Constructor",
    class: "Auxiliary",
    size: "L",
    price: 3_050_000,
    crew: 28,
    cargo: 5300,
    speed: 88,
    manufacturer: "Paranid"
  },
  {
    id: "paranid_resupplier",
    name: "Paranid Resupplier",
    class: "Auxiliary",
    size: "M",
    price: 780_000,
    crew: 14,
    cargo: 2000,
    speed: 142,
    manufacturer: "Paranid"
  },
  {
    id: "teladi_constructor",
    name: "Teladi Constructor",
    class: "Auxiliary",
    size: "L",
    price: 3_100_000,
    crew: 26,
    cargo: 5400,
    speed: 86,
    manufacturer: "Teladi Company"
  },
  {
    id: "teladi_resupplier",
    name: "Teladi Resupplier",
    class: "Auxiliary",
    size: "M",
    price: 820_000,
    crew: 15,
    cargo: 2100,
    speed: 138,
    manufacturer: "Teladi Company"
  },

  // Additional Boron DLC Ships
  {
    id: "boron_octopus",
    name: "Boron Octopus",
    class: "Auxiliary",
    size: "L",
    price: 3_200_000,
    crew: 30,
    cargo: 5600,
    speed: 85,
    manufacturer: "Boron"
  },
  {
    id: "boron_nautilus",
    name: "Boron Nautilus",
    class: "Auxiliary",
    size: "M",
    price: 850_000,
    crew: 16,
    cargo: 2300,
    speed: 135,
    manufacturer: "Boron"
  },
  // Additional Xenon Ships
  {
    id: "xenon_l",
    name: "Xenon L",
    class: "Heavy Fighter",
    size: "S",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 270,
    manufacturer: "Xenon"
  },
  {
    id: "xenon_xl",
    name: "Xenon XL",
    class: "Destroyer",
    size: "XL",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 65,
    manufacturer: "Xenon"
  },

  // Additional VIG Ships
  {
    id: "vig_chimera",
    name: "Chimera",
    class: "Heavy Fighter",
    size: "S",
    price: 225_000,
    crew: 2,
    cargo: 28,
    speed: 245,
    manufacturer: "VIG"
  },
  {
    id: "vig_griffin",
    name: "Griffin",
    class: "Corvette",
    size: "M",
    price: 975_000,
    crew: 20,
    cargo: 300,
    speed: 170,
    manufacturer: "VIG"
  },

  // Additional Paranid Ships
  {
    id: "atlas_sentinel",
    name: "Atlas Sentinel",
    class: "Transport",
    size: "L",
    price: 3_050_000,
    crew: 30,
    cargo: 7000,
    speed: 118,
    manufacturer: "Paranid"
  },
  {
    id: "odysseus_sentinel",
    name: "Odysseus Sentinel",
    class: "Carrier",
    size: "XL",
    price: 12_350_000,
    crew: 365,
    cargo: 2650,
    speed: 63,
    manufacturer: "Paranid"
  },

  // Additional Support Ships
  {
    id: "argon_mobile_support",
    name: "Argon Mobile Support",
    class: "Auxiliary",
    size: "M",
    price: 785_000,
    crew: 15,
    cargo: 2100,
    speed: 140,
    manufacturer: "Argon Federation"
  },
  {
    id: "split_service_vessel",
    name: "Split Service Vessel",
    class: "Auxiliary",
    size: "M",
    price: 795_000,
    crew: 14,
    cargo: 2000,
    speed: 145,
    manufacturer: "Split Dynasty"
  },
  {
    id: "boron_support_ship",
    name: "Boron Support Ship",
    class: "Auxiliary",
    size: "M",
    price: 825_000,
    crew: 16,
    cargo: 2200,
    speed: 138,
    manufacturer: "Boron"
  },
  // Kha'ak Ships
  {
    id: "khaak_scout",
    name: "Kha'ak Scout",
    class: "Scout",
    size: "S",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 280,
    manufacturer: "Kha'ak"
  },
  {
    id: "khaak_fighter",
    name: "Kha'ak Fighter",
    class: "Fighter",
    size: "S",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 265,
    manufacturer: "Kha'ak"
  },
  {
    id: "khaak_hive",
    name: "Kha'ak Hive",
    class: "Carrier",
    size: "XL",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 60,
    manufacturer: "Kha'ak"
  },
  {
    id: "khaak_destroyer",
    name: "Kha'ak Destroyer",
    class: "Destroyer",
    size: "L",
    price: 0,
    crew: 0,
    cargo: 0,
    speed: 85,
    manufacturer: "Kha'ak"
  },

  // Additional Boron Kingdom End Ships
  {
    id: "boron_stingray",
    name: "Boron Stingray",
    class: "Heavy Fighter",
    size: "S",
    price: 208_000,
    crew: 2,
    cargo: 35,
    speed: 238,
    manufacturer: "Boron"
  },
  {
    id: "boron_swordfish",
    name: "Boron Swordfish",
    class: "Corvette",
    size: "M",
    price: 945_000,
    crew: 22,
    cargo: 310,
    speed: 168,
    manufacturer: "Boron"
  },
  {
    id: "boron_narwhal",
    name: "Boron Narwhal",
    class: "Frigate",
    size: "M",
    price: 1_485_000,
    crew: 42,
    cargo: 750,
    speed: 145,
    manufacturer: "Boron"
  },

  // Additional Specialized Ships
  {
    id: "terran_expeditionary",
    name: "Terran Expeditionary Vessel",
    class: "Auxiliary",
    size: "XL",
    price: 7_850_000,
    crew: 75,
    cargo: 10000,
    speed: 80,
    manufacturer: "Terran"
  },
  {
    id: "paranid_pilgrim",
    name: "Paranid Pilgrim",
    class: "Transport",
    size: "L",
    price: 3_250_000,
    crew: 35,
    cargo: 7500,
    speed: 115,
    manufacturer: "Paranid"
  },
  {
    id: "teladi_venture",
    name: "Teladi Venture",
    class: "Trader",
    size: "M",
    price: 450_000,
    crew: 10,
    cargo: 2800,
    speed: 150,
    manufacturer: "Teladi Company"
  },
  // Pioneer Ships (Segaris)
  {
    id: "pioneer_explorer",
    name: "Pioneer Explorer",
    class: "Scout",
    size: "S",
    price: 76_000,
    crew: 2,
    cargo: 45,
    speed: 255,
    manufacturer: "Segaris"
  },
  {
    id: "pioneer_trader",
    name: "Pioneer Trader",
    class: "Trader",
    size: "M",
    price: 380_000,
    crew: 10,
    cargo: 2200,
    speed: 140,
    manufacturer: "Segaris"
  },

  // Additional Boron Variants
  {
    id: "boron_skate",
    name: "Boron Skate",
    class: "Scout",
    size: "S",
    price: 79_000,
    crew: 2,
    cargo: 42,
    speed: 262,
    manufacturer: "Boron"
  },
  {
    id: "boron_hammerhead",
    name: "Boron Hammerhead",
    class: "Corvette",
    size: "M",
    price: 935_000,
    crew: 21,
    cargo: 305,
    speed: 172,
    manufacturer: "Boron"
  },

  // Additional Terran Ships
  {
    id: "terran_courier",
    name: "Terran Courier",
    class: "Transport",
    size: "M",
    price: 425_000,
    crew: 12,
    cargo: 2400,
    speed: 135,
    manufacturer: "Terran"
  },
  {
    id: "terran_interceptor",
    name: "Terran Interceptor",
    class: "Fighter",
    size: "S",
    price: 165_000,
    crew: 2,
    cargo: 25,
    speed: 275,
    manufacturer: "Terran"
  },

  // Additional Yaki Variants
  {
    id: "yaki_kappa",
    name: "Yaki Kappa",
    class: "Scout",
    size: "S",
    price: 82_000,
    crew: 1,
    cargo: 38,
    speed: 270,
    manufacturer: "Yaki"
  },
  {
    id: "yaki_demon",
    name: "Yaki Demon",
    class: "Destroyer",
    size: "L",
    price: 4_950_000,
    crew: 88,
    cargo: 1350,
    speed: 92,
    manufacturer: "Yaki"
  },

  // HAT/PAR/HOP Variants
  {
    id: "hat_vanguard",
    name: "HAT Vanguard",
    class: "Fighter",
    size: "S",
    price: 152_000,
    crew: 2,
    cargo: 28,
    speed: 258,
    manufacturer: "Holy Order"
  },
  {
    id: "hop_sentinel",
    name: "HOP Sentinel",
    class: "Fighter",
    size: "S",
    price: 155_000,
    crew: 2,
    cargo: 30,
    speed: 255,
    manufacturer: "Holy Order"
  },

  // Additional Mining Ships
  {
    id: "boron_harvester",
    name: "Boron Harvester",
    class: "Miner",
    size: "L",
    price: 2_850_000,
    crew: 38,
    cargo: 8000,
    speed: 105,
    manufacturer: "Boron"
  },
  {
    id: "split_rockbreaker",
    name: "Split Rockbreaker",
    class: "Miner",
    size: "L",
    price: 2_750_000,
    crew: 35,
    cargo: 7800,
    speed: 108,
    manufacturer: "Split Dynasty"
  }
];