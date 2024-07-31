import React from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import Progress from "components/progress";
import { MdRemoveRedEye } from "react-icons/md";
import SubtaskDetails from "./SubtaskDetail"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export default function SubtaskTableView(props) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  const [subtaskDetailVisible, setSubtaskDetailVisible] = React.useState(false);
  const [selectedSubtask, setSelectedSubtask] = React.useState(null);

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
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {new Date(info.getValue()).toLocaleDateString()}
        </p>
      ),
    }),
    columnHelper.accessor('quantity', {
      id: 'quantity',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">PROGRESS</p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <Progress
            width="w-[108px]"
            value={90}
            color={info.getValue() === 100 ? 'bg-blue-500' : 'bg-red-500'}
          />
          <button
            className="ml-2 text-navy-700 dark:text-white"
            onClick={() => {
              setSelectedSubtask(info.row.original);
              setSubtaskDetailVisible(true);
            }}
          >
            <MdRemoveRedEye />
          </button>
        </div>
      ),
    }),
    // New column for the button
    columnHelper.accessor("view", {
      id: "view",
      cell: (info) => (
        // <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md">
        //                     Add Subtask
        //                 </button>
        <button
          onClick={() => {
            const subtaskId = info.row.original.id; // Assuming each subtask has a unique ID
            const taskId = info.row.original.taskId; // Assuming you have taskId
            navigate(`/admin/cases-${taskId}/subtask-${subtaskId}/views`);
          }}
          className="px-4 py-2 text-white bg-blue-600 rounded-md"
          type="submit"
        >
          <MdRemoveRedEye className="text-xl transform scale-150 hover:scale-175 transition-transform duration-300" />
        </button>
      ),
    }),
  ];

  const [data, setData] = React.useState(() => [...tableData]);
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
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        {/* <div className="text-xl font-bold text-navy-700 dark:text-white">
          Subtasks Table
        </div> */}
        {/* <CardMenu /> */}
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="min-w-[150px] border-white/0 py-3  pr-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {subtaskDetailVisible && selectedSubtask && (
        <SubtaskDetails subtask={selectedSubtask} onClose={() => setSubtaskDetailVisible(false)} />
      )}
    </Card>
  );
}