import { ReactNode } from "react";
import EmptyState from "../EmptyState/EmptyState";
import Loading from "../Loading/Loading";

const TableV2 = ({
  dataSource,
  columns,
  className,
  rowClassName = "",
  loading,
  loadingTitle,
}) => {
  return (
    <div className={`pg-table-wrapper flex flex-col ${className || ""}`}>
      <div className={`-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8`}>
        <div
          className={`py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8`}
        >
          <div className="relative">
            {loading && (
              <div className="clowny-table-loading">
                <div className="absolute w-full h-full top-0 left-0 bg-white opacity-80 z-10"></div>
                <div className="flex justify-center items-center absolute w-full h-full top-0 left-0 z-20">
                  <div className="flex flex-col gap-2">
                    <span className="text-xl font-medium">{loadingTitle}</span>
                    <Loading />
                  </div>
                </div>
              </div>
            )}
            <table className="pg-table min-w-full divide-y border-collapse border border-slate-500">
              <thead>
                <tr>
                  {columns.map((column, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="px-6 py-4 md:py-10 text-left text-base text-black tracking-wider border border-slate-600"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && !dataSource.length ? (
                  <tr className="h-20"></tr>
                ) : null}

                {dataSource.map((row, idx) => (
                  <tr key={idx} className={`${rowClassName}`}>
                    {row.map((item, index) => (
                      <td
                        key={index}
                        className="px-6 py-2 md:py-10 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200 border border-slate-600"
                      >
                        {item}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {!dataSource.length && !loading && <EmptyState />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableV2;
