import React, { useState } from "react";

import { CiEdit } from "react-icons/ci";
import DetailQuestionModal from "./question/DetailQuestionModal";

export default function DetailQuestion() {
  // 문의 작성하는 모달 useState
  const [questionModalOpen, setQuestionModalOpen] = useState(false);

  return (
    <div className="w-full py-14 text-[0.875rem] overflow-hidden relative">
      <div className="w-full flex justify-between items-center">
        <div>
          <p>궁금한점을 해결해드립니다.</p>
          <p>
            먼저 FAQ를 확인하시면 보다 유용한 정보를 빠르게 확인할 수 있습니다.
          </p>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setQuestionModalOpen(true);
          }}
          className="w-36 py-3 bg-black border-[1px] border-solid border-black rounded-lg text-white text-[0.875rem] hover:bg-transparent hover:text-black transition-all duration-700 flex justify-center items-center"
        >
          <p className="mr-2 text-[1.2rem]">
            <CiEdit />
          </p>
          <p>문의하기</p>
        </button>
      </div>

      <div></div>

      <DetailQuestionModal></DetailQuestionModal>
    </div>
  );
}