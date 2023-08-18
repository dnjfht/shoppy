import React, { useRef, useState } from "react";

import { CiEdit } from "react-icons/ci";
import DetailQuestionModal from "./DetailQuestionModal";

export default function DetailQuestion() {
  // 문의 작성하는 모달 useState
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [questionContent, setQuestionContent] = useState("");

  const questionTypeInputRef = useRef(null);

  const handleSelectQuestionType = (e) => {
    e.preventDefault();

    setQuestionType(e.target.value);
  };

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

      {questionModalOpen && (
        <DetailQuestionModal
          onClose={(e) => {
            e.preventDefault();
            setQuestionModalOpen(false);
          }}
        >
          <div className="w-full p-4 box-border">
            <div className="w-full flex items-center">
              <p className="w-2/12">질문분류</p>

              <select
                ref={questionTypeInputRef}
                onChange={(e) => handleSelectQuestionType(e)}
                className="w-full p-3 border-[1px] bg-transparent border-solid border-[#e5e5e5] outline-none rounded-lg"
              >
                <option disabled selected>
                  질문하실 분류를 선택해주세요.
                </option>
                <option
                  value="상품문의"
                  key="상품문의"
                  className="hover:bg-black"
                >
                  상품문의
                </option>
                <option
                  value="배송문의"
                  key="배송문의"
                  className="hover:bg-black"
                >
                  배송문의
                </option>
                <option
                  value="기타문의"
                  key="기타문의"
                  className="hover:bg-black"
                >
                  기타문의
                </option>
              </select>
            </div>

            <div className="w-full mt-4 flex items-center">
              <p className="w-2/12">질문내용</p>

              <textarea
                rows={10}
                cols={50}
                minLength={10}
                placeholder="내용을 입력해주세요."
                className="w-full p-3 box-border border-[1px] border-solid border-[#e5e5e5] rounded-lg outline-none resize-none"
              />
            </div>
          </div>
        </DetailQuestionModal>
      )}
    </div>
  );
}
