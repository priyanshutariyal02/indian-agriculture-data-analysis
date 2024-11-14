type CropData = {
  Country: string;
  Year: number;
  CropName: string;
  Production: number;
  Yield: number;
  Area: number;
};


// parsing data from json file
export const parseData = (rawData: any[]): CropData[] => {
  return rawData.map((item) => ({
    Country: item.Country,
    Year: parseInt(item.Year.match(/\d+/)?.[0] || "0"),
    CropName: item["Crop Name"],
    Production: parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0,
    Yield:
      parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0,
    Area: parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0,
  }));
};

export type YearlyProduction = {
  Year: number;
  MaxProductionCrop: string;
  MinProductionCrop: string;
};

export type CropAverage = {
  CropName: string;
  AverageYield: number;
  AverageArea: number;
};

// calculate max/min production per year
export const getMaxMinProductionByYear = (
  data: CropData[]
): YearlyProduction[] => {
  const yearMap = new Map<number, CropData[]>();

  data.forEach((entry) => {
    if (!yearMap.has(entry.Year)) {
      yearMap.set(entry.Year, []);
    }
    yearMap.get(entry.Year)?.push(entry);
  });

  const result: YearlyProduction[] = [];
  yearMap.forEach((crops, year) => {
    let maxProduction = Math.max(...crops.map((c) => c.Production));
    let minProduction = Math.min(...crops.map((c) => c.Production));
    result.push({
      Year: year,
      MaxProductionCrop:
        crops.find((c) => c.Production === maxProduction)?.CropName || "",
      MinProductionCrop:
        crops.find((c) => c.Production === minProduction)?.CropName || "",
    });
  });

  return result.sort((a, b) => a.Year - b.Year);
};

// calculate average yield and area per crop
export const getAverageYieldAndAreaByCrop = (
  data: CropData[]
): CropAverage[] => {
  const cropMap = new Map<string, { totalYield: number; totalArea: number; count: number }>();

  data.forEach((entry) => {
    if (!cropMap.has(entry.CropName)) {
      cropMap.set(entry.CropName, { totalYield: 0, totalArea: 0, count: 0 });
    }
    const cropStats = cropMap.get(entry.CropName)!;
    cropStats.totalYield += entry.Yield;
    cropStats.totalArea += entry.Area;
    cropStats.count += 1;
  });

  return Array.from(cropMap.entries()).map(([cropName, stats]) => ({
    CropName: cropName,
    AverageYield: parseFloat((stats.totalYield / stats.count).toFixed(3)),
    AverageArea: parseFloat((stats.totalArea / stats.count).toFixed(3)),
  }));
};
