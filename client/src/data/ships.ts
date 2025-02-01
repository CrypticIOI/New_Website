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
  },
  {
    id: "atlas_sentinel",
    name: "Atlas Sentinel",
    class: "Resupply",
    size: "XL",
    price: 11_568_815,
    crew: 205,
    cargo: 34800,
    speed: 114,
    manufacturer: "Paranid"
  },
  {
    id: "atlas_vanguard",
    name: "Atlas Vanguard",
    class: "Resupply",
    size: "XL",
    price: 9_640_505,
    crew: 247,
    cargo: 29000,
    speed: 130,
    manufacturer: "Paranid"
  },
  {
    id: "barbarossa",
    name: "Barbarossa",
    class: "Transport",
    size: "L",
    price: 7_714_025,
    crew: 126,
    cargo: 21000,
    speed: 194,
    manufacturer: "Pirates"
  },
  {
    id: "barracuda",
    name: "Barracuda",
    class: "Heavy Fighter",
    size: "S",
    price: 245_690,
    crew: 2,
    cargo: 330,
    speed: 123,
    manufacturer: "Boron"
  },
  {
    id: "behemoth_e",
    name: "Behemoth E",
    class: "Destroyer",
    size: "L",
    price: 6_250_830,
    crew: 48,
    cargo: 3100,
    speed: 156,
    manufacturer: "Argon Federation"
  },
  {
    id: "behemoth_sentinel",
    name: "Behemoth Sentinel",
    class: "Destroyer",
    size: "L",
    price: 5_641_250,
    crew: 36,
    cargo: 2760,
    speed: 116,
    manufacturer: "Argon Federation"
  },
  {
    id: "behemoth_vanguard",
    name: "Behemoth Vanguard",
    class: "Destroyer",
    size: "L",
    price: 4_713_125,
    crew: 44,
    cargo: 2300,
    speed: 127,
    manufacturer: "Argon Federation"
  },
  {
    id: "boa",
    name: "Boa",
    class: "Transport",
    size: "M",
    price: 373_740,
    crew: 20,
    cargo: 7500,
    speed: 304,
    manufacturer: "Split Dynasty"
  },
  {
    id: "bolo_gas",
    name: "Bolo (Gas)",
    class: "Miner",
    size: "M",
    price: 388_740,
    crew: 7,
    cargo: 10000,
    speed: 247,
    manufacturer: "Terran Protectorate"
  },
  {
    id: "bolo_mineral",
    name: "Bolo (Mineral)",
    class: "Miner",
    size: "M",
    price: 388_740,
    crew: 7,
    cargo: 8800,
    speed: 247,
    manufacturer: "Terran Protectorate"
  },
  {
    id: "buffalo",
    name: "Buffalo",
    class: "Transport",
    size: "L",
    price: 2_938_525,
    crew: 59,
    cargo: 16000,
    speed: 215,
    manufacturer: "Split Dynasty"
  },
  {
    id: "buzzard_sentinel",
    name: "Buzzard Sentinel",
    class: "Fighter",
    size: "S",
    price: 190_320,
    crew: 2,
    cargo: 360,
    speed: 134,
    manufacturer: "Teladi Company"
  },
  {
    id: "buzzard_vanguard",
    name: "Buzzard Vanguard",
    class: "Fighter",
    size: "S",
    price: 157_850,
    crew: 3,
    cargo: 300,
    speed: 144,
    manufacturer: "Teladi Company"
  },
  {
    id: "callisto_sentinel",
    name: "Callisto Sentinel",
    class: "Transport",
    size: "S",
    price: 98_455,
    crew: 2,
    cargo: 1236,
    speed: 141,
    manufacturer: "Argon Federation"
  },
  {
    id: "callisto_vanguard",
    name: "Callisto Vanguard",
    class: "Transport",
    size: "S",
    price: 80_050,
    crew: 3,
    cargo: 1030,
    speed: 153,
    manufacturer: "Argon Federation"
  },
  {
    id: "cerberus_sentinel",
    name: "Cerberus Sentinel",
    class: "Frigate",
    size: "M",
    price: 1_145_000,
    crew: 11,
    cargo: 2112,
    speed: 189,
    manufacturer: "Argon Federation"
  },
    {
    id: "cerberus_vanguard",
    name: "Cerberus Vanguard",
    class: "Frigate",
    size: "M",
    price: 963_665,
    crew: 14,
    cargo: 1760,
    speed: 218,
    manufacturer: "Argon Federation"
  },
  {
    id: "chimera",
    name: "Chimera",
    class: "Heavy Fighter",
    size: "S",
    price: 338_625,
    crew: 2,
    cargo: 200,
    speed: 337,
    manufacturer: "Split Dynasty"
  },
  {
    id: "chthonios_gas_sentinel",
    name: "Chthonios (Gas) Sentinel",
    class: "Miner",
    size: "L",
    price: 1_395_770,
    crew: 33,
    cargo: 38400,
    speed: 237,
    manufacturer: "Paranid"
  },
  {
    id: "chthonios_gas_vanguard",
    name: "Chthonios (Gas) Vanguard",
    class: "Miner",
    size: "L",
    price: 1_154_890,
    crew: 40,
    cargo: 32000,
    speed: 259,
    manufacturer: "Paranid"
  },
  {
    id: "chthonios_mineral_sentinel",
    name: "Chthonios (Mineral) Sentinel",
    class: "Miner",
    size: "L",
    price: 1_395_770,
    crew: 33,
    cargo: 38400,
    speed: 237,
    manufacturer: "Paranid"
  },
  {
    id: "chthonios_mineral_vanguard",
    name: "Chthonios (Mineral) Vanguard",
    class: "Miner",
    size: "L",
    price: 1_154_890,
    crew: 40,
    cargo: 32000,
    speed: 259,
    manufacturer: "Paranid"
  },
  {
    id: "cobra",
    name: "Cobra",
    class: "Frigate",
    size: "M",
    price: 2_172_540,
    crew: 25,
    cargo: 1290,
    speed: 472,
    manufacturer: "Split Dynasty"
  },
  {
    id: "colossus_e",
    name: "Colossus E",
    class: "Carrier",
    size: "XL",
    price: 15_359_641,
    crew: 131,
    cargo: 25000,
    speed: 142,
    manufacturer: "Argon Federation"
  },
  {
    id: "colossus_sentinel",
    name: "Colossus Sentinel",
    class: "Carrier",
    size: "XL",
    price: 12_102_675,
    crew: 102,
    cargo: 22800,
    speed: 104,
    manufacturer: "Argon Federation"
  },
  {
    id: "colossus_vanguard",
    name: "Colossus Vanguard",
    class: "Carrier",
    size: "XL",
    price: 10_090_050,
    crew: 123,
    cargo: 19000,
    speed: 116,
    manufacturer: "Argon Federation"
  },
  {
    id: "condor_sentinel",
    name: "Condor Sentinel",
    class: "Carrier",
    size: "XL",
    price: 13_409_595,
    crew: 112,
    cargo: 33600,
    speed: 103,
    manufacturer: "Teladi Company"
  },
  {
    id: "condor_vanguard",
    name: "Condor Vanguard",
    class: "Carrier",
    size: "XL",
    price: 11_170_550,
    crew: 135,
    cargo: 28000,
    speed: 116,
    manufacturer: "Teladi Company"
  },
  {
    id: "cormorant_vanguard",
    name: "Cormorant Vanguard",
    class: "Transport",
    size: "M",
    price: 418_830,
    crew: 17,
    cargo: 7900,
    speed: 113,
    manufacturer: "Teladi Company"
  },
  {
    id: "courier_mineral",
    name: "Courier (Mineral)",
    class: "Miner",
    size: "S",
    price: 83_265,
    crew: 3,
    cargo: 2600,
    speed: 265,
    manufacturer: "Argon Federation"
  },
  {
    id: "courier_sentinel",
    name: "Courier Sentinel",
    class: "Transport",
    size: "S",
    price: 185_980,
    crew: 4,
    cargo: 2352,
    speed: 198,
    manufacturer: "Argon Federation"
  },
  {
    id: "courier_vanguard",
    name: "Courier Vanguard",
    class: "Transport",
    size: "S",
    price: 155_760,
    crew: 5,
    cargo: 1960,
    speed: 215,
    manufacturer: "Argon Federation"
  }
];