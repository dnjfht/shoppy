import React from "react";
import { useParams } from "react-router-dom";

export default function ProductsList() {
  const params = useParams().istName;
  console.log(params);
  return <div></div>;
}
