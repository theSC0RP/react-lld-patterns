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

type IBookList = {
  books: Book[]
}
const BookList = ({ books }: IBookList): ReactElement => {
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

type IBookSearchContainer = {
  title: string,
  description: string,
  inputValue: string,
  inputValueOnChange: Dispatch<SetStateAction<string>>,
  books: Book[],
  apiCallCount: number
}
const BookSearchContainer = ({title, description, inputValue, inputValueOnChange, books, apiCallCount}:IBookSearchContainer):ReactElement => {
  return <div className="w-[50%] p-4 border-1 border-neutral-600 rounded-xl">
    <h2 className="text-center text-xl font-semibold mb-1">
      {title}
    </h2>
    <p className="font-thin mb-6">({description})</p>
    <div className="flex items-center">
      <label className="mr-2 w-[150px] text-left text-lg">
        Search Query:{" "}
      </label>
      <Input
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          inputValueOnChange(e.target.value);
        }}
        className="rounded-lg p-2 h-[32px] w-full"
        placeholder="Enter the book you want to search"
      />
    </div>
    <BookList books={books} />

    <p className="mt-4 text-left">
      API called {apiCallCount} times
    </p>
  </div>
}

const DebouncedInputView = () => {
  const [instantQuery, setInstantQuery] = useState<string>("");
  const [instantApiCallCount, setInstantApiCallCount] = useState<number>(0);
  const [instantBookResults, setInstantBookResults] = useState<Book[]>([]);

  const [debouncedQueryInput, setDebouncedQueryInput] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [debouncedApiCallCount, setDebouncedApiCallCount] = useState<number>(0);
  const [debouncedBookResults, setDebouncedBookResults] = useState<Book[]>([]);

  const limit = 10;
  const debounceDelay = 500;
  

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
          id: book.key || book.cover_i || book.title,
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
      const timeoutId = setTimeout(() => setDebouncedQuery(debouncedQueryInput), debounceDelay)

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
      <BookSearchContainer 
        title="Normal Input"
        description="API called on every keystroke"
        inputValue={instantQuery}
        inputValueOnChange={setInstantQuery}
        books={instantBookResults}
        apiCallCount={instantApiCallCount}
      />

      <BookSearchContainer 
        title="Debounced Input"
        description={`API called after user stops typing for ${debounceDelay}ms`}
        inputValue={debouncedQueryInput}
        inputValueOnChange={setDebouncedQueryInput}
        books={debouncedBookResults}
        apiCallCount={debouncedApiCallCount}
      />
    </div>
  );
};

export default DebouncedInputView;
