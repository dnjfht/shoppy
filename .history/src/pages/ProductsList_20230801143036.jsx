import React from "react";
import { useParams } from "react-router-dom";

export default function ProductsList() {
  const params = useParams().listName;
  console.log(params);
  return (
    <div className="w-full">
      <div></div>
    </div>
  );
}
