import { nanoid } from "nanoid";
import React, { useRef, useState, type DragEvent } from "react";
import Button from "../../components/Button";

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

const DragAndDropList = () => {
  const [list, setList] = useState<Avenger[]>(originalAvengers);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragged = useRef<Avenger | null>(null);

  const onListItemDrag = (e: DragEvent, listItem: Avenger) => {
    if (!isDragging) {
      setList((prev) => prev.filter((l) => l.id != listItem.id));
      setIsDragging(true);
      dragged.current = listItem;
    }
  };

  const onListItemDrop = (e: DragEvent) => {
    console.log("On Drop: ", e);
    setIsDragging(false);
    dragged.current = null;
  };

  const onListItemDragEnd = (e: DragEvent) => {
    console.log("On Drag End: ", e);
    setIsDragging(false);
    dragged.current = null;
  };

  const onListItemDragOver = (e: DragEvent, listItem: Avenger) => {
    console.log("On Drag Over: ", e);
  };

  return (
    <div>
      <div className="flex mb-4">
        <div className="text-left text-lg">
          Rearrange the original Avengers in order of your favorites.
        </div>
        <Button 
          onClick={() => setList(originalAvengers)}
          className="ml-8 px-8 py-1 bg-blue-500 rounded-md h-[32px]"
        > 
        Reset
        </Button>
      </div>

      <div
        onDrop={onListItemDrop}
        className="p-20 bg-gray-950 w-fit"
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        {list.map((listItem: Avenger) => {
          return (
            <div
              key={listItem.id}
              draggable
              className="my-4 p-2 rounded-md bg-gray-700 w-md"
              onDrag={(e) => onListItemDrag(e, listItem)}
              onDragEnd={onListItemDragEnd}
              onDragOver={(e) => onListItemDragOver(e, listItem)}
            >
              {listItem.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DragAndDropList;
