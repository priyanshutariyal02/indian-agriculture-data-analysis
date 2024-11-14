import { Table } from "@mantine/core";
import { CropAverage } from "../utils/constant";

type AverageYieldTableProps = {
  data: CropAverage[];
};

const AverageYieldTable: React.FC<AverageYieldTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto mb-5">
      <Table
        striped
        highlightOnHover
        className="min-w-full border border-gray-200 rounded-lg shadow-sm"
      >
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left font-semibold text-gray-700">
              Crop Name
            </th>
            <th className="p-3 text-left font-semibold text-gray-700">
              Average Yield (Kg/Ha)
            </th>
            <th className="p-3 text-left font-semibold text-gray-700">
              Average Area (Ha)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.CropName} className="hover:bg-gray-50 even:bg-gray-50">
              <td className="p-3 border-t border-gray-200 text-gray-800">
                {row.CropName}
              </td>
              <td className="p-3 border-t border-gray-200 text-gray-800">
                {row.AverageYield}
              </td>
              <td className="p-3 border-t border-gray-200 text-gray-800">
                {row.AverageArea}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AverageYieldTable;
