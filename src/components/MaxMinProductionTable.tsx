import { Table } from "@mantine/core";
import { YearlyProduction } from "../utils/constant";

type MaxMinProductionTableProps = {
  data: YearlyProduction[];
};

const MaxMinProductionTable: React.FC<MaxMinProductionTableProps> = ({
  data,
}) => {
  return (
    <div className="overflow-x-auto mb-5">
      <Table
        striped
        highlightOnHover
        className="min-w-full border border-gray-200 rounded-lg shadow-sm"
      >
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left font-semibold text-gray-700">Year</th>
            <th className="p-3 text-left font-semibold text-gray-700">
              Maximum Production (Tonnes)
            </th>
            <th className="p-3 text-left font-semibold text-gray-700">
              Minimum Production (Tonnes)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.Year} className="hover:bg-gray-50 even:bg-gray-50">
              <td className="p-3 border-t border-gray-200 text-gray-800">
                {row.Year}
              </td>
              <td className="p-3 border-t border-gray-200 text-gray-800">
                {row.MaxProductionCrop}
              </td>
              <td className="p-3 border-t border-gray-200 text-gray-800">
                {row.MinProductionCrop}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MaxMinProductionTable;
