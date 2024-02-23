import React from "react";

const Loading = () => {
  return (
    <div className="top-0 left-0 z-[3] w-full h-full border-0 rounded-lg bg-zinc-300 flex justify-center items-center bg-opacity-25">
      <div className="  ">
        <div className="animate-spin rounded-full h-[10rem] w-[10rem] border-t-4  border-slate-200"></div>
      </div>
    </div>
  );
};

export default Loading;
