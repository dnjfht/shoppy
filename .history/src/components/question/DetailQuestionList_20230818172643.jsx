import React, { useState } from "react";
import { CiLock } from "react-icons/ci";

export default function DetailQuestionList({ questionData, user }) {
  console.log(questionData);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(questionData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
    <>
      <table className="w-full mt-10 text-center">
        <thead>
          <tr>
            <th className="border-b-[1px] border-solid border-[#ccc]">번호</th>
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
                <td className="flex justify-center items-center">
                  <CiLock />
                  {inquiry.questionType}
                </td>
                <td>
                  {user !== null
                    ? inquiry.userId.slice(0, 4) + "***"
                    : inquiry.phoneNumber.slice(0, 7) + "****"}
                </td>
                <td>{inquiry.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {totalPages > 1 && (
          <div>
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
