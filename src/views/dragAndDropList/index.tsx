import { nanoid } from "nanoid";
import React, { useState, type DragEvent } from "react";

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
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragged, setDragged] = useState<Avenger|null>(null)

  const onListItemDrag = (e: DragEvent, listItem: Avenger) => {
    if (!isDragging) {
      setList((prev) => prev.filter(l => l.id != listItem.id))
      setIsDragging(true)
      setDragged(listItem)
    }
  };

  const onListItemDrop = (e: DragEvent) => {
    console.log("On Drop: ", e);
    setIsDragging(false); 
    setDragged(null);
  };

  const onListItemDragEnd = (e: DragEvent) => {
    console.log("On Drag End: ", e);
    setIsDragging(false); 
    setDragged(null);
  };

  const onListItemDragOver = (e: DragEvent, listItem: Avenger) => {
    console.log("On Drag Over: ", e);
  }

  return (
    <div>
      <div className="text-left text-lg mb-4">
        Rearrange the original Avengers in order of your favorites.
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
