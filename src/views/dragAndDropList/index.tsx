import { nanoid } from "nanoid";
import React, { useRef, useState, type DragEvent } from "react";
import { MdOutlineDragIndicator } from "react-icons/md";
import Button from "../../components/Button";
import "./style.css";

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
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const dragged = useRef<Avenger | null>(null);
  const dragAllowed = useRef<boolean>(false);

  const onListItemDragStart = (e: DragEvent, listItem: Avenger) => {
    if (!dragAllowed.current) {
      e.preventDefault();
      return;
    }

    dragged.current = listItem;

    const target = e.currentTarget as HTMLElement;
    target.classList.add("dragging");

    dragAllowed.current = false;
  };

  const onListItemDrop = () => {
    setList((prev) => {
      const newList = [...prev.filter((li) => li.id !== dragged.current?.id)];

      const originalIndex = prev.findIndex(li => li.id === dragged.current?.id);
      const adjustedIndex = dropIndex! > originalIndex ? dropIndex! - 1 : dropIndex!;
      newList.splice(adjustedIndex, 0, dragged.current as Avenger);

      return newList;
    });
  };

  const onListItemDragEnd = (e: DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove("dragging");
    setDropIndex(null);
  };

  const onListItemDragOver = (e: DragEvent, index: number) => {
    const target = e.target as HTMLElement;
    const { top, height } = target.getBoundingClientRect();
    const clientY = e.clientY;

    let targetIndex = index;
    if (clientY > top + height / 2) {
      targetIndex = index + 1; // Place below the current element
    }

    setDropIndex(targetIndex);
  };

  const onDragIconMouseDown = () => {
    dragAllowed.current = true;
  };

  return (
    <div>
      <div className="flex mb-4 items-center">
        <div className="text-left text-lg">
          Rearrange the Avengers in order of your favorites.
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
        className="p-5 bg-gray-950 w-fit"
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        {list.map((listItem: Avenger, i: number) => {
          const showIndicator = dropIndex === i;
          return (
            <React.Fragment key={listItem.id}>
              {showIndicator && (
                <div className="h-1 bg-gray-500 rounded my-1 transition-all" />
              )}
              <div
                // key={listItem.id}
                draggable
                className="my-4 p-2 rounded-md bg-gray-700 w-md"
                onDragStart={(e) => onListItemDragStart(e, listItem)}
                onDragOver={(e) => onListItemDragOver(e, i)}
                onDragEnd={(e) => onListItemDragEnd(e)}
              >
                <div className="flex justify-between items-center">
                  {listItem.title}
                  <MdOutlineDragIndicator
                    data-drag-handle
                    className="cursor-move"
                    onMouseDown={onDragIconMouseDown}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default DragAndDropList;
