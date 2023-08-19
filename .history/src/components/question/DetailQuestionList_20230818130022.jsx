import React, { useState } from "react";

export default function DetailQuestionList({ questionData, user }) {
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

  return (
    <div>
      <h2>상품문의</h2>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentQuestionData &&
            currentQuestionData.map((inquiry, index) => (
              <tr key={inquiry.id}>
                <td>{startIndex + index + 1}</td>
                <td>{inquiry.questionType}</td>
                <td>
                  {user !== null
                    ? inquiry.userId
                    : inquiry.phoneNumber.slice(0, 8) + "****"}
                </td>
                <td>{inquiry.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {questionData.length > itemsPerPage && (
          <div>
            {Array.from({
              length: Math.ceil(questionData.length / itemsPerPage),
            }).map((_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
