import { Book } from "@/types/interfaces/book";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  loading: boolean;
  books: Book[];
}

export default function Books({ loading, books }: Props) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!books.length) {
    return <div className="text-center font-semibold">No result</div>;
  }

  return (
    <div className="py-4 flex flex-col gap-3">
      {books.map((book) => (
        <div
          key={book.key}
          className="p-6 bg-white border border-gray-200 rounded-md hover:bg-gray-100 text-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {book.title}
          </h5>
          {book.author_name && (
            <p className="mb-2">
              <span className="font-semibold">Author(s)</span>:{" "}
              {book.author_name.join(", ")}
            </p>
          )}
          <p className="mb-2">
            <span className="font-semibold">First Published Year:</span>{" "}
            {book.first_publish_year}
          </p>
          {book.isbn && (
            <p className="mb-2">
              <span className="font-semibold">ISBN:</span>{" "}
              {book.isbn.join(", ")}
            </p>
          )}
          <p className="mb-2">
            <span className="font-semibold">Number of pages:</span>{" "}
            {book.number_of_pages_median || 0}
          </p>
        </div>
      ))}
    </div>
  );
}
