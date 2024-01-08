import { Book } from "./book";

export interface BookSearchResult {
  docs: Book[];
  numFound: number;
  numFoundExact: number;
  q: string;
  offset: number | null;
  start: number;
}
