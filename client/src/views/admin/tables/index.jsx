import CheckTable from "./components/CheckTable";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "./variables/columnsData";

import tableDataColumns from "./variables/tableDataColumns.json";
import ColumnsTable from "./components/ColumnsTable";

const Tables = () => {
  return (
    <div>
      <div className="mt-5 grid h-full gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-1 p-5">

      {tableDataColumns.map((task, index) => (
        <ColumnsTable key={index} tableData={[task]} />
      ))}


      </div>
    </div>
  );
};

export default Tables;
