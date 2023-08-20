import React from "react";

export default function Scroll() {
  return (
    <div className="flex flex-col">
      <div className="w-[50px] h-[50px] bg-slate-900 rounded-full text-white">
        UP
      </div>
      <div className="w-[50px] h-[50px] bg-slate-900 rounded-full text-white">
        DOWN
      </div>
    </div>
  );
}
