import { Teacher } from "@/types/interfaces";

interface Column {
  header: string;
  accessor: string;
  className?: string;
}

interface TableProps {
  columns: Column[];
  children: React.ReactNode;
}

const Table = ({ columns, children }: TableProps) => {
  return (
    <table className="mt-4 flex w-full flex-col gap-4 text-left">
      <thead className="">
        <tr className="flex justify-between gap-4 border-b border-card py-1">
          {columns.map((column) => (
            <th key={column.accessor} className={`${column.className} flex-1`}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="flex flex-col">{children}</tbody>
    </table>
  );
};

export default Table;
