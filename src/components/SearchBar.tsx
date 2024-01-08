import { SearchFilter } from "@/types/interfaces/search-filter";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  onChange: (filter: SearchFilter) => void;
}

export default function SearchBar({ onChange }: Props) {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [sortByFirstPublish, setSortByFirstPublish] = useState(false);

  useEffect(() => {
    onChange({
      searchText,
      sortByFirstPublish,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText, sortByFirstPublish]);

  return (
    <div className="w-full">
      <div>
        <label htmlFor="book-search" className="text-gray-700 font-semibold">Book Name:</label>
        <input
          id="book-search"
          className="border border-gray-600 outline-none rounded px-2 py-1 ml-2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="flex items-center mt-4">
        <div className="text-gray-700 font-semibold">Sort By:</div>
        <label className="ml-3">
          <input
            type="radio"
            className=""
            checked={!sortByFirstPublish}
            onChange={() => setSortByFirstPublish(false)}
          />{" "}
          Relevance
        </label>
        <label className="ml-3">
          <input
            type="radio"
            className=""
            checked={sortByFirstPublish}
            onChange={() => setSortByFirstPublish(true)}
          />{" "}
          First Published
        </label>
      </div>
    </div>
  );
}
