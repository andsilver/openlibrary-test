"use client";

import axios from "axios";
import { useState } from "react";
import { Book } from "@/types/interfaces/book";
import { BookSearchResult } from "@/types/interfaces/book-search-result";
import { SearchFilter } from "@/types/interfaces/search-filter";
import SearchBar from "@/components/SearchBar";
import Books from "@/components/Books";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filter: SearchFilter) => {
    const { searchText, sortByFirstPublish } = filter;

    if (!searchText) {
      setBooks([]);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.get<BookSearchResult>(
        "https://openlibrary.org/search.json",
        {
          params: {
            q: searchText,
            ...(sortByFirstPublish ? { sort: "old" } : {}),
          },
        }
      );
      setBooks(data.docs);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto py-20">
      <SearchBar onChange={handleSearch} />
      <div className="border-t border-gray my-6" />
      <Books books={books} loading={loading} />
    </main>
  );
}
