import React from "react";
import { useParams } from "react-router-dom";

export default function ProductsList() {
  const params = useParams().listName;
  console.log(params);
  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto"></div>
    </div>
  );
}