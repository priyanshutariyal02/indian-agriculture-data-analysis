import { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import MaxMinProductionTable from "./components/MaxMinProductionTable";
import AverageYieldTable from "./components/AverageYieldTable";
import {
  parseData,
  getMaxMinProductionByYear,
  getAverageYieldAndAreaByCrop,
  YearlyProduction,
  CropAverage,
} from "./utils/constant";
import rawData from "../Manufac _ India Agro Dataset.json"; // Replace with your dataset path

export default function App() {
  const [maxMinData, setMaxMinData] = useState<YearlyProduction[]>([]);
  const [averageData, setAverageData] = useState<CropAverage[]>([]);

  useEffect(() => {
    const parsedData = parseData(rawData);
    setMaxMinData(getMaxMinProductionByYear(parsedData));
    setAverageData(getAverageYieldAndAreaByCrop(parsedData));
  }, []);
  return (
    <MantineProvider theme={theme}>
      <div className="w-full min-h-screen px-10">
        <h1 className="text-center text-5xl font-bold py-5">
          Indian Agriculture Data Analysis
        </h1>
        <h2 className="text-2xl font-semibold mb-2">
          Max/Min Production by Year
        </h2>
        <MaxMinProductionTable data={maxMinData} />
        <h2 className="text-2xl font-semibold mb-2 ">
          Average Yield and Area by Crop
        </h2>
        <AverageYieldTable data={averageData} />
      </div>
    </MantineProvider>
  );
}
