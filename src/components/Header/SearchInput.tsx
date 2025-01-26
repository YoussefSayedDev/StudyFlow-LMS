import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function SearchInput() {
  return (
    <div className="relative">
      <Search className="absolute left-0 top-0 size-5 translate-x-1/2 translate-y-1/2" />
      <Input type="search" placeholder="Search..." className="ps-9" />
    </div>
  );
}
