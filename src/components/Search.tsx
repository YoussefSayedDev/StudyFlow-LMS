import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div>
      <div className="md:hidden">
        <MobileSearch />
      </div>
      <div className="hidden md:block">
        <DesktopSearch />
      </div>
    </div>
  );
};

const MobileSearch = () => {
  return (
    <div className="flex h-[40px] w-full items-center rounded-md border border-border bg-sidebar-background px-4 py-2 md:w-fit">
      <FaSearch
        size={20}
        className="text-foreground transition-colors duration-300 hover:text-primary"
      />
    </div>
  );
};

const DesktopSearch = () => {
  return (
    <div className="flex h-[50px] w-full items-center rounded-md border border-border bg-sidebar-background px-4 py-2 md:w-fit">
      <FaSearch
        size={24}
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

export default Search;
