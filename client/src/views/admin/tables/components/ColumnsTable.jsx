import React from "react";
import { useNavigate } from "react-router-dom";
import { MdCancel, MdCheckCircle, MdRemoveRedEye } from "react-icons/md";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";

const columnHelper = createColumnHelper();

function ColumnsTable(props) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  const navigate = useNavigate();

  let defaultData = tableData.flatMap(task => task.subtasks.map(subtask => ({
    ...subtask,
    "hunting-task": task["hunting-task"],
    desc: task.desc,
    "task-date": task.date
  })));

  const columns = [
    columnHelper.accessor("subtask", {
      id: "subtask",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">SUBTASK</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">STATUS</p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          {info.getValue() === "Done" ? (
            <MdCheckCircle className="text-green-500 me-1 dark:text-green-300" />
          ) : info.getValue() === "In Progress" ? (
            <MdCancel className="text-amber-500 me-1 dark:text-amber-300" />
          ) : null}
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("quantity", {
      id: "quantity",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">QUANTITY</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    // New column for the button
    columnHelper.accessor("view", {
      id: "view",
      cell: (info) => (
        <button
          onClick={() => {
            const subtaskId = info.row.original.id; // Assuming each subtask has a unique ID
            const taskId = info.row.original.taskId; // Assuming you have taskId
            navigate(`/admin/cases-${taskId}/subtask-${subtaskId}/views`);
          }}
          className="text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-300 focus:outline-none"
        >
          <MdRemoveRedEye className="text-xl transform scale-150 hover:scale-175 transition-transform duration-300" />
        </button>
      ),
    }),
  ];

  const [data, setData] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      {tableData.map((task, index) => (
        <div key={index}>
          <header className="relative flex items-center justify-between">
            <div className="text-xl font-bold text-navy-700 dark:text-white">
              {task["hunting-task"]}
            </div>
            <div className="text-sm text-gray-500 dark:text-white">
              {task.date}
            </div>
            <CardMenu />
          </header>
          <p className="text-sm text-gray-500 dark:text-white">{task.desc}</p>
        </div>
      ))}

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  if (header.id !== 'view') { // Skip rendering header for 'view' column
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                      >
                        <div className="flex items-center justify-between text-xs text-gray-200">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " ▲",
                            desc: " ▼",
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      </th>
                    );
                  }
                  return null;
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="min-w-[150px] border-white/0 py-3 pr-4"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default ColumnsTable;
