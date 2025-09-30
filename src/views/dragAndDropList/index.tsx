import { nanoid } from "nanoid";
import React, { useState } from "react";

type Avenger = {
  id: string;
  title: string;
};
const originalAvengers: Avenger[] = [
  {
    id: nanoid(),
    title: "Black Widow",
  },
  {
    id: nanoid(),
    title: "Captain America",
  },
  {
    id: nanoid(),
    title: "Hawkeye",
  },
  {
    id: nanoid(),
    title: "Hulk",
  },
  {
    id: nanoid(),
    title: "Iron Man",
  },
  {
    id: nanoid(),
    title: "Thor",
  },
];
const useAvengerList = <T,>(initialList: T[]) => {
  const [list, setList] = useState<T[]>(initialList);
  return { list, setList };
};

const DragAndDropList = () => {
  const { list, setList } = useAvengerList<Avenger>(originalAvengers);

  return (
    <div >
      <div className="text-left text-lg mb-4">Rearrange the original Avengers in order of your favorites.</div>
      {list.map((listItem: Avenger) => {
        return <div key={listItem.id} draggable className="my-4 p-2 rounded-md bg-gray-700 w-md">
          {listItem.title}
        </div>
      })}
    </div>
  );
};

export default DragAndDropList;
