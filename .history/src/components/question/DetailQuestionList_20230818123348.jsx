import React, { useState } from "react";

export default function DetailQuestionList({ questionData }) {
  console.log(questionData);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  return <div></div>;
}
