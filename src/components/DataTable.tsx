import React from "react";

interface Column {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, title }) => {
  return (
    <div className="w-full !p-6 md:p-8 bg-base-200 shadow-lg rounded-2xl border border-base-300">
      {title && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-xl font-semibold text-base-content">{title}</h2>
        </div>
      )}

      <div className="overflow-x-auto p-2">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-base-300 text-base-content text-sm uppercase tracking-wider">
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`!px-2 !py-1 font-semibold ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                      ? "text-center"
                      : "text-left"
                  } ${index === 0 ? "rounded-tl-xl" : ""} ${
                    index === columns.length - 1 ? "rounded-tr-xl" : ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-base-100" : "bg-base-200"
                } rounded-xl text-base`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={column.key}
                    className={`!px-2 !py-1 font-medium text-base-content ${
                      column.align === "right"
                        ? "text-right"
                        : column.align === "center"
                        ? "text-center"
                        : "text-left"
                    } ${colIndex === 0 ? "rounded-l-xl" : ""} ${
                      colIndex === columns.length - 1 ? "rounded-r-xl" : ""
                    }`}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
