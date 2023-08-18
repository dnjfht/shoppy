import React, { useRef, useState } from "react";
import DetailQuestionModal from "./DetailQuestionModal";
import Button from "../../components/Button";

import { CiEdit } from "react-icons/ci";

export default function DetailQuestion({ user }) {
  // 문의 작성하는 모달 useState

  // user가 없을 때만
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  // user가 있을 때, 없을 때 전부
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [questionData, setQuestionData] = useState([]);

  const questionTypeInputRef = useRef(null);

  const handleSelectQuestionType = (e) => {
    e.preventDefault();

    setQuestionType(e.target.value);
  };

  const handleAddQuestionContent = (e) => {
    setQuestionContent(e.target.value);
  };

  const checkPhonenumber = (e) => {
    const inputValue = e.target.value;
    // 입력된 값에서 숫자만 추출하여 저장합니다.
    const numericValue = inputValue.replace(/\D/g, "");
    setPhoneNumber(numericValue);
  };

  const checkPasswordNumber = (e) => {
    const inputValue = e.target.value;
    // 정규표현식을 사용하여 숫자만 추출하여 저장합니다.
    const numericValue = inputValue.replace(/\D/g, "");
    setPassword(numericValue);
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
            {!user && (
              <div className="w-full mb-4 flex">
                <div className="w-1/2 flex items-center">
                  <label className="w-[28%]" htmlFor="phoneNumber">
                    전화번호
                  </label>
                  <input
                    id="phoneNumber"
                    className="4/6 border-[1px] border-solid border-[#e5e5e5] outline-none"
                    type="text"
                    onChange={(e) => checkPhonenumber(e)}
                    value={phoneNumber}
                    maxlength="11"
                    placeholder="전화번호를 입력하세요."
                    pattern="[0-9]+"
                  />
                </div>

                <div className="w-1/2 p-3 border-[1px] border-solid border-[#c1c1c1] rounded-r-lg flex items-center">
                  <label className="w-2/12" htmlFor="password">
                    비밀번호
                  </label>
                  <input
                    id="password"
                    className="w-[60%] ml-3 outline-none"
                    type="password"
                    onChange={(e) => checkPasswordNumber(e)}
                    value={password}
                    pattern="[0-9]*"
                    placeholder="비밀번호를 입력하세요."
                    minLength={4}
                    maxLength={4}
                  />
                </div>
              </div>
            )}
            <div className="w-full flex items-center">
              <p className="w-2/12">질문분류</p>

              <select
                ref={questionTypeInputRef}
                onChange={handleSelectQuestionType}
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
                onChange={handleAddQuestionContent}
                rows={20}
                cols={50}
                minLength={10}
                placeholder="내용을 입력해주세요."
                className="w-full p-3 box-border border-[1px] border-solid border-[#e5e5e5] rounded-lg outline-none resize-none"
              />
            </div>

            <Button value="등록" />
          </div>
        </DetailQuestionModal>
      )}
    </div>
  );
}
