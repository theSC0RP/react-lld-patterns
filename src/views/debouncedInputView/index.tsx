import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from "react";
import Input from "../../components/Input";

type Book = {
  id: string;
  authors: string[];
  title: string;
};

const BookList = ({ books }: { books: Book[] }): ReactElement => {
  return (
    <div className="mt-4">
      <div className="text-left text-lg">Books</div>
      {books.map((book) => {
        return (
          <div key={book.id} className="border-1 border-neutral-700 p-2 m-2">
            <div className="font-bold font-sm">{book?.title}</div>
            <div className="font-thin">{book?.authors?.join(", ")}</div>
          </div>
        );
      })}
    </div>
  );
};

const DebouncedInputView = () => {
  const [instantQuery, setInstantQuery] = useState<string>("");
  const [instantApiCallCount, setInstantApiCallCount] = useState<number>(0);
  const [instantBookResults, setInstantBookResults] = useState<Book[]>([]);

  const [debouncedQueryInput, setDebouncedQueryInput] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [debouncedApiCallCount, setDebouncedApiCallCount] = useState<number>(0);
  const [debouncedBookResults, setDebouncedBookResults] = useState<Book[]>([]);

  const limit = 10;

  const fetchBooks = async (
    searchQuery: string,
    stateUpdateFunction: Dispatch<SetStateAction<Book[]>>,
    countUpdateFunction:Dispatch<SetStateAction<number>>
  ) => {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${searchQuery.toLowerCase()}&limit=${limit}`
    );
    const data = await response.json();
    const books = data?.docs;
    
    stateUpdateFunction(
      books.map((book: any) => {
        return {
          id: book.cover_i,
          authors: book.author_name,
          title: book.title,
        };
      })
    );
    countUpdateFunction(prev => prev + 1)
  };

  useEffect(() => {
    if (instantQuery) {
      fetchBooks(instantQuery, setInstantBookResults, setInstantApiCallCount);
    } else {
      setInstantBookResults([]);
    }
  }, [instantQuery]);

  useEffect(() => {
    if (debouncedQueryInput) {
      const timeoutId = setTimeout(() => setDebouncedQuery(debouncedQueryInput), 500)

      return () => {clearTimeout(timeoutId)}
    } else {
      setDebouncedBookResults([])
    }
  }, [debouncedQueryInput]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchBooks(debouncedQuery, setDebouncedBookResults, setDebouncedApiCallCount);
    } else {
      setDebouncedBookResults([])
    }
  }, [debouncedQuery])

  return (
    <div className="flex w-full gap-2">
      <div className="w-[50%] p-4 border-1 border-neutral-600 rounded-xl">
        <div className="text-center text-xl font-semibold mb-6">
          Normal Input
        </div>
        <div className="flex items-center">
          <label className="mr-2 w-[150px] text-left text-lg">
            Search Query:{" "}
          </label>
          <Input
            value={instantQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInstantQuery(e.target.value);
            }}
            className="rounded-lg p-2 h-[32px] w-full"
            placeholder="Enter the book you want to search"
          />
        </div>
        <BookList books={instantBookResults} />

        <div className="mt-4 text-left">
          API called {instantApiCallCount} times
        </div>
      </div>

      <div className="w-[50%] p-4 border-1 border-neutral-600 rounded-xl">
        <div className="text-center text-xl font-semibold mb-6">
          Debounced Input
        </div>
        <div className="flex items-center">
          <label className="mr-2 w-[150px] text-left text-lg">
            Search Query:{" "}
          </label>
          <Input
            value={debouncedQueryInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setDebouncedQueryInput(e.target.value);
            }}
            className="rounded-lg p-2 h-[32px] w-full"
            placeholder="Enter the book you want to search"
          />
        </div>
        <BookList books={debouncedBookResults} />

        <div className="mt-4 text-left">
          API called {debouncedApiCallCount} times
        </div>
      </div>
    </div>
  );
};

export default DebouncedInputView;
