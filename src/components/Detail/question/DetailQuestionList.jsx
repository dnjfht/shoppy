import { useState } from "react";

import { CiLock } from "react-icons/ci";
import { PiCaretRightThin, PiCaretLeftThin } from "react-icons/pi";

export default function DetailQuestionList({
  firestoreInquiryData,
  user,
  setQuestionDetailModalOpen,
  setQuestionModalIdBucket,
  item,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(firestoreInquiryData?.length / itemsPerPage);

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

  const currentQuestionData = firestoreInquiryData?.slice(startIndex, endIndex);

  const handleQuestionModalIdBucket = (e, pw, idx, userId) => {
    e.preventDefault();

    if (user !== null) {
      if (user.uid === userId) {
        setQuestionModalIdBucket(idx);
        setQuestionDetailModalOpen(true);
      } else {
        alert("본인의 게시물만 확인할 수 있습니다.");
      }
    } else if (user === null) {
      const password = prompt("비밀번호 숫자 네 자리를 입력해주세요.");
      if (password === pw) {
        setQuestionModalIdBucket(idx);
        setQuestionDetailModalOpen(true);
      } else {
        alert("비밀번호를 다시 입력해주세요.");
      }
    }
  };

  return (
    <div className="w-full h-[620px] relative]">
      <table className="w-full mt-4 text-center">
        <thead className="w-full">
          <tr className="w-full">
            <th className="w-[10%] py-6 border-b-[1px] border-solid border-[#dfdfdf]">
              번호
            </th>
            <th className="w-[70%] py-6 border-b-[1px] border-solid border-[#dfdfdf]">
              제목
            </th>
            <th className="w-[10%] py-6 border-b-[1px] border-solid border-[#dfdfdf]">
              작성자
            </th>
            <th className="w-[10%] py-6 border-b-[1px] border-solid border-[#dfdfdf]">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          {currentQuestionData &&
            currentQuestionData
              .filter((data) => item.id === data.productId)
              .map((inquiry, index) => (
                <tr
                  key={inquiry.id}
                  onClick={(e) =>
                    handleQuestionModalIdBucket(
                      e,
                      inquiry.password,
                      inquiry.id,
                      inquiry.userId
                    )
                  }
                >
                  <td className="py-4">{startIndex + index + 1}</td>
                  <td className="flex items-center justify-center py-4 cursor-pointer">
                    <p className="mr-2">
                      <CiLock />
                    </p>
                    {inquiry.questionType}
                  </td>
                  <td className="py-4">
                    {!inquiry?.phoneNumber
                      ? inquiry?.userId?.slice(0, 4) + "***"
                      : inquiry?.phoneNumber?.slice(0, 7) + "****"}
                  </td>
                  <td className="py-4">{formatDate(inquiry.date)}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <div className="absolute bottom-0 flex items-center justify-center w-full">
        {totalPages > 1 && (
          <div className="flex items-center justify-center">
            <button
              className="mr-4"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <PiCaretLeftThin />
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`${currentPage === index + 1 ? "active" : ""} mx-2`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="ml-4"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <PiCaretRightThin />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} (${hours}:${minutes})`;
}
