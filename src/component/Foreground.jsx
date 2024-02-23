import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import AddNotes from "./AddNotes";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { noteAction } from "../store/notes";

const Foreground = () => {
  const ref = useRef(null);

  const { note } = useSelector((store) => store.note);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isEditNoteClicked, setisEditNoteClicked] = useState(false);

  const [fetching, setFetching] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    fetch("https://dummyjson.com/posts/1")
      .then((res) => res.json())
      .then((data) => {
        dispatch(noteAction.initialNote(data));
        setFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setFetching(false);
      });
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="fixed top-0 left-0 z-[3] w-full h-full flex gap-5 flex-wrap p-5"
      >
        {fetching && <Loading />}
        {!fetching &&
          note.length > 0 &&
          note.map((item, i) => (
            <Card
              item={item}
              reference={ref}
              key={i}
              setIsSidebarOpen={setIsSidebarOpen}
              setisEditNoteClicked={setisEditNoteClicked}
            />
          ))}
      </div>
      <AddNotes
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isEditNoteClicked={isEditNoteClicked}
        setisEditNoteClicked={setisEditNoteClicked}
      />
    </>
  );
};

export default Foreground;
