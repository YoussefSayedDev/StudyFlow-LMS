import { FaSearch } from "react-icons/fa";

const TableSearch = () => {
  return (
    <div className="flex h-[35px] w-full items-center rounded-md border border-border bg-sidebar-background px-4 py-2 md:w-[220px]">
      <FaSearch
        size={20}
        className="text-foreground transition-colors duration-300 hover:text-primary"
      />
      <input
        type="text"
        placeholder="Search..."
        className="ml-4 w-full border-none bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default TableSearch;
