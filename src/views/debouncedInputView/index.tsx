import { useEffect, useState, type ChangeEvent, type InputEvent } from "react";
import Input from "../../components/Input";

type Book = {
  id: string,
  authors: string[],
  title: string
}

const DebouncedInputView = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputChangeCount, setInputChangeCount] = useState<number>(0);
  const [inputSearchedBooks, setInputSearchedBooks] = useState<Book[]>([]);
  const limit = 10;

  const fetchBooks = async (searchQuery: string) => {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${searchQuery.toLowerCase()}&limit=${limit}`
    );
    const data = await response.json()
    const books = data?.docs
    console.log(books)
    setInputSearchedBooks(books.map((book:any) => {
      return {
        "id": book.cover_i,
        "authors": book.author_name,
        "title": book.title
      }
    }))
  };

  useEffect(() => {
    if (inputValue) 
      fetchBooks(inputValue);
    else
      setInputSearchedBooks([])
  }, [inputValue]);

  return (
    <div className="flex w-full gap-2">
      <div className="w-[50%] p-4 border-1 border-neutral-600 rounded-xl">
        <div className="text-center text-xl font-semibold mb-6">Normal Input</div>
        <div className="flex items-center">
          <label className="mr-2 w-[150px] text-left text-lg">Search Query: </label>
          <Input
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);

              setInputChangeCount((prev) => prev + 1);
            }}
            className="rounded-lg p-2 h-[32px] w-full"
            placeholder="Enter the pokemon you want to search"
          />
        </div>
        <div className="mt-4">
          <div className="text-left text-lg">Books</div>
          {inputSearchedBooks.map(book => {
            return <div key={book.id} className="border-1 border-neutral-700 p-2 m-2">
              <div className="font-bold font-sm">{book?.title}</div>
              <div className="font-thin">{book?.authors?.join(", ")}</div>
            </div>
          })}
        </div>

        <div className="mt-4 text-left">API called {inputChangeCount} times</div>
      </div>
      <div className="w-[50%] p-4 border-1 border-neutral-600 rounded-xl">
        <div className="text-center text-xl font-semibold mb-6">Debounced Input</div>
      </div>
    </div>
  );
};

export default DebouncedInputView;
