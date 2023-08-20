import React from "react";

export default function Scroll() {
  return (
    <div className="flex flex-col text-[0.8rem] fixed bottom-5 right-5">
      <button className="w-20 h-[50px] bg-slate-900 rounded-full text-white justify-center items-center">
        <p>UP</p>
      </button>
      <button className="w-[50px] h-[50px] mt-2 bg-slate-900 rounded-full text-white flex justify-center items-center">
        <p>DOWN</p>
      </button>
    </div>
  );
}
