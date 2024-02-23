import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { RiEdit2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { noteAction } from "../store/notes";
import { MdContentCopy } from "react-icons/md";

const Card = ({ item, reference, setIsSidebarOpen, setisEditNoteClicked }) => {
  const dispatch = useDispatch();
  const handelDelete = () => {
    dispatch(noteAction.deleteNote(item));
  };
  const handelCopy = () => {
    dispatch(noteAction.copyNote(item));
  };
  const handelDownload = () => {
    dispatch(noteAction.downloadNote(item));
  };
  const handelEdit = () => {
    dispatch(noteAction.editNote(item));
    setIsSidebarOpen(true);
    setisEditNoteClicked(true);
  };
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.2 }}
      className="relative flex-shrink-0 w-60  h-[22rem] bg-zinc-900/90 rounded-[45px] py-10 px-8 overflow-hidden text-white cursor-move"
    >
      <div className="flex justify-between">
        <MdContentCopy className="cursor-pointer" onClick={handelCopy} />
        <IoMdClose className="cursor-pointer" onClick={handelDelete} />
      </div>

      <div>
        <p className="text-pretty  text-xl mt-3 font-bold leading-tight cursor-text  ">
          {item.title}
        </p>
        <p className="text-pretty w-48 h-[7.5rem] overflow-auto mt-2  cursor-text">
          {item.body}
        </p>
      </div>

      <div className="footer absolute bottom-0   w-full  left-0">
        <div className="flex items-center py-3 px-8 justify-between mb-3">
          <span
            className="w-7 h-7  rounded-full flex justify-center items-center cursor-pointer"
            onClick={handelEdit}
          >
            <RiEdit2Fill size="1.1em" color="#fff" />
          </span>
        </div>

        <div
          className={`tag w-full py-4  bg-green-600  flex cursor-pointer items-center justify-center`}
          onClick={handelDownload}
        >
          <h3 className="text-sm font-semibold">Download Now</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
