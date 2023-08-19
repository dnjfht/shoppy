import React, { useState } from "react";

export default function DetailQuestionList({ questionData }) {
  console.log(questionData);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  // 1 페이지라고 치면 0번부터 시작
  // (1 - 1) * 10 = 0;

  // 9 페이지라고 치면 80번부터 시작
  // (9 - 1) * 10 = 80;

  const endIndex = startIndex + itemsPerPage;
  // 1 페이지라고 치면 10번에서 끝남
  // 0 + 10 = 10;

  // 9 페이지라고 치면 90번에서 끝남
  // 80 + 10 = 90;

  const currentQuestionData = questionData.slice(startIndex, endIndex);

  return <div></div>;
}
