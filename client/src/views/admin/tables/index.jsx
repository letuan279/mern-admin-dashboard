import CheckTable from "./components/CheckTable";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";

import { useContext, useEffect } from "react";
import TaskContext from "contexts/TaskContext";

const Tables = () => {

  const { tasks, getAllTasks } = useContext(TaskContext);

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div>
      {/* <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
      </div> */}

      {/* <div className="mt-5 grid h-full grid-cols-2 gap-5 md:grid-cols-1"> */}
      <div className="mt-5 grid h-full gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-1 p-5">

      {tasks.map((task, index) => (
        <ColumnsTable key={index} tableData={[task]} />
      ))}

        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
      </div>
    </div>
  );
};

export default Tables;
