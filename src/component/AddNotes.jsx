import React, { useRef, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { noteAction } from "../store/notes";

const AddNotes = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setisEditNoteClicked,
  isEditNoteClicked,
}) => {
  const titleElement = useRef();
  const bodyeElement = useRef();

  let editingNote = useSelector((store) => store.note.editingNote);

  const dispatch = useDispatch();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCancle = () => {
    titleElement.current.value = "";
    bodyeElement.current.value = "";
    setisEditNoteClicked(false);
  };

  if (isEditNoteClicked) {
    if (editingNote.length !== 0) {
      titleElement.current.value = editingNote[0].title;
      bodyeElement.current.value = editingNote[0].body;
    }
  }

  const handelSubmit = (evt) => {
    evt.preventDefault();
    if (
      titleElement.current.value !== "" &&
      bodyeElement.current.value !== ""
    ) {
      const postTitle = titleElement.current.value;
      const postBody = bodyeElement.current.value;

      titleElement.current.value = "";
      bodyeElement.current.value = "";

      fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: postTitle,
          userId: 5,
          body: postBody,
        }),
      })
        .then((res) => res.json())
        .then((newNote) => {
          dispatch(noteAction.addNote(newNote));
          setIsSidebarOpen(false);
        });
    }
    setisEditNoteClicked(false);
  };

  return (
    <>
      <div className="relative z-[5]">
        {!isSidebarOpen && (
          <div
            className="fixed bottom-4 right-4  p-2 bg-zinc-900  rounded-full shadow-lg cursor-pointer"
            onClick={handleSidebarToggle}
          >
            <MdOutlineAdd size="3em" color="#fff" />
          </div>
        )}

        <div
          id="sidebar"
          className={`fixed top-0 right-0 h-screen w-80 bg-zinc-700 border-l rounded-l-3xl border-zinc-700 drop-shadow-2xl transform transition-transform duration-300 p-5 ${
            isSidebarOpen ? "" : "translate-x-full"
          }`}
        >
          <div
            className="absolute top-4 right-4 bg-zinc-500 text-white p-2 rounded-full shadow-lg cursor-pointer"
            onClick={handleSidebarToggle}
          >
            <IoMdClose />
          </div>

          <form className=" p-2  flex flex-col gap-5" onSubmit={handelSubmit}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="title"
                className="font-sans font-bold text-slate-200 "
              >
                Title
              </label>
              <input
                ref={titleElement}
                type="text"
                placeholder="Enter Title"
                className="block w-full border-0 rounded-lg px-2 py-1 bg-zinc-600 text-white  break-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="text"
                className="font-sans font-bold text-slate-200"
              >
                Notes
              </label>
              <textarea
                ref={bodyeElement}
                cols="30"
                rows="10"
                placeholder="write here..."
                className="border-0 rounded-xl p-2 bg-zinc-600 text-white"
                wrap="soft"
                style={{ whiteSpace: "pre-wrap" }}
              ></textarea>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="border-0 rounded-xl bg-green-600 font-bold text-white right-0 py-2 px-4"
              >
                Add
              </button>
              <button
                onClick={handleCancle}
                type="button"
                className="border-0 rounded-xl bg-red-600 font-bold text-white right-0 px-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNotes;
