import React from "react";

const Background = () => {
  return (
    <div className="fixed z-[2] w-full h-screen">
      <h3 className="absolute top-[5%] w-full flex justify-center py-10 text-zinc-600 font-semibold text-xl">
        Notes
      </h3>
      <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[13vw] font-semibold text-zinc-900 leading-none tracking-tighter">
        DOCS.
      </h1>
    </div>
  );
};

export default Background;
