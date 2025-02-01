import { ships } from "@/data/ships";

function analyzeShipData() {
  // Check for duplicate IDs
  const idCounts = ships.reduce((acc, ship) => {
    acc[ship.id] = (acc[ship.id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const duplicateIds = Object.entries(idCounts)
    .filter(([_, count]) => count > 1)
    .map(([id]) => id);

  // Check for duplicate names
  const nameCounts = ships.reduce((acc, ship) => {
    acc[ship.name] = (acc[ship.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const duplicateNames = Object.entries(nameCounts)
    .filter(([_, count]) => count > 1)
    .map(([name]) => name);

  // Check manufacturer consistency
  const manufacturers = [...new Set(ships.map(ship => ship.manufacturer))];

  return {
    duplicateIds,
    duplicateNames,
    manufacturers: manufacturers.sort()
  };
}

const analysis = analyzeShipData();
console.log('Duplicate IDs:', analysis.duplicateIds);
console.log('Duplicate Names:', analysis.duplicateNames);
console.log('All Manufacturers:', analysis.manufacturers);