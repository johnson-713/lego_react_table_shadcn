import { Input } from "@/Component/ui/input";
import { SearchIcon } from "lucide-react";

const AppSearchInput = ({
  placeholder,
  handleSearch,
  searchInputClassName = "",
}: {
  placeholder: string;
  handleSearch: (value: string) => void;
  searchInputClassName?: string;
}) => {
  return (
    <div className="relative max-w-[400px] w-full">
      <Input
        className={`p-[10px] pl-[40px] rounded-[11px] w-full max-w-[310px] ${searchInputClassName}`}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default AppSearchInput;
