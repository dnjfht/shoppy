import React, { useRef, useState } from "react";
import DetailQuestionInputModal from "./DetailQuestionInputModal";
import Button from "../../components/Button";
import DetailQuestionList, { formatDate } from "./DetailQuestionList";
import DetailQuestionModal from "./DatailQuestionModal";
import { v4 as uuidv4 } from "uuid";

import { CiEdit } from "react-icons/ci";

export default function DetailQuestion({ user, item }) {
  // 문의 작성하는 모달 useState

  // user가 없을 때만
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  // user가 있을 때, 없을 때 전부
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [questionData, setQuestionData] = useState([
    {
      productId: item.id,
      id: uuidv4(),
      date: 1692329192479,
      phoneNumber: "01078543278",
      password: "0913",
      questionType: "배송문의",
      questionContent:
        "배송이 언제쯤 오는지 알 수 있을까요? 일 주일 안에 꼭 받아봤으면 해서요...ㅠㅠㅠ",
    },
    {
      productId: item.id,
      id: uuidv4(),
      date: 1692339192948,
      phoneNumber: "01047742186",
      password: "3621",
      questionType: "상품문의",
      questionContent:
        "이 상품 베이지 컬러가 품절됐던데 언제쯤 다시 들어오는지 알 수 있을까요?",
    },
    {
      productId: item.id,
      id: uuidv4(),
      date: 1692368145890,
      phoneNumber: "01059481592",
      password: "6953",
      questionType: "배송문의",
      questionContent:
        "배송이 계속 늦어지고 있어요...ㅠㅠㅠㅠㅠㅠㅠ 언제쯤 배송이 오는 거죠 벌써 일 주일이 지났는데",
    },
    {
      productId: item.id,
      id: uuidv4(),
      date: 1692372509273,
      phoneNumber: "01049036145",
      password: "9827",
      questionType: "사이즈문의",
      questionContent:
        "배송온 옷의 사이즈가 저한테 조금 작은 것 같은데 교환 가능할까요?",
    },
    {
      productId: item.id,
      id: uuidv4(),
      date: 1692375824586,
      phoneNumber: "01052837558",
      password: "0119",
      questionType: "기타문의",
      questionContent: "기타문의 입니다...!",
    },
    {
      productId: item.id,
      id: uuidv4(),
      date: 1692379405289,
      phoneNumber: "01020968754",
      password: "4832",
      questionType: "사이즈문의",
      questionContent:
        "배송온 옷의 사이즈가 저한테 조금 작은 것 같은데 교환 가능할까요?",
    },
    {
      productId: item.id,
      id: uuidv4(),
      date: 1692395845329,
      phoneNumber: "01059088234",
      password: "5772",
      questionType: "배송문의",
      questionContent:
        "주문한지 시간이 꽤 지났는데 아직도 배송이 오질 않네요...",
    },
    {
      productId: item.id,
      id: uuidv4(),
      date: 1692399187645,
      phoneNumber: "01041205863",
      password: "6341",
      questionType: "기타문의",
      questionContent: "기타 문의 드립니다.",
    },
    {
      productId: item.id,
      id: uuidv4(),
      date: 1692399405728,
      phoneNumber: "01020968754",
      password: "4832",
      questionType: "사이즈문의",
      questionContent:
        "배송온 옷의 사이즈가 저한테 조금 작은 것 같은데 교환 가능할까요?",
    },
    {
      productId: item.id,
      id: uuidv4(),
      date: 1692411686304,
      phoneNumber: "01089004730",
      password: "2948",
      questionType: "배송문의",
      questionContent:
        "2주 전에 주문했는데 아직도 배송이 오지 않았습니다... 진짜 늦네요;",
    },
    {
      productId: item.id,
      id: uuidv4(),
      date: 1692411886304,
      phoneNumber: "01032345610",
      password: "9050",
      questionType: "기타문의",
      questionContent: "기타 문의 드립니다.",
    },
  ]);

  // 문의 상세페이지 모달 관련 useState
  const [questionDetailModalOpen, setQuestionDetailModalOpen] = useState(false);
  const [QuestionModalIdBucket, setQuestionModalIdBucket] = useState("");

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

  const handleAddQuestionData = (e) => {
    e.preventDefault();

    if (user !== null) {
      if (questionType !== "" && questionContent !== "") {
        const newQuestionData = {
          productId: item.id,
          id: uuidv4(),
          date: Date.now(),
          userId: user.uid,
          questionType: questionType,
          questionContent: questionContent,
        };

        setQuestionData((prev) => {
          return [...prev, newQuestionData];
        });
        setQuestionType("");
        setQuestionContent("");

        setQuestionModalOpen(false);
      } else {
        alert("빈 칸을 채워주세요.");
      }
    } else if (user === null) {
      if (
        phoneNumber !== "" &&
        password !== "" &&
        questionType !== "" &&
        questionContent !== ""
      ) {
        const newQuestionData = {
          productId: item.id,
          id: uuidv4(),
          date: Date.now(),
          phoneNumber: phoneNumber,
          password: password,
          questionType: questionType,
          questionContent: questionContent,
        };

        setQuestionData((prev) => {
          return [...prev, newQuestionData];
        });

        setPhoneNumber("");
        setPassword("");
        setQuestionType("");
        setQuestionContent("");

        setQuestionModalOpen(false);
      } else {
        alert("빈 칸을 채워주세요.");
      }
    }
  };

  const handleDeleteQuestion = (e, idx) => {
    e.preventDefault();

    setQuestionData((prev) => prev.filter((data) => data.id !== idx));
    setQuestionDetailModalOpen(false);
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

      <DetailQuestionList
        questionData={questionData}
        user={user}
        setQuestionDetailModalOpen={setQuestionDetailModalOpen}
        questionDetailModalOpen={questionDetailModalOpen}
        setQuestionModalIdBucket={setQuestionModalIdBucket}
        item={item}
      />

      {questionModalOpen && (
        <DetailQuestionInputModal
          onClose={(e) => {
            e.preventDefault();
            setQuestionModalOpen(false);
          }}
        >
          <div className="w-full p-4 box-border">
            {!user && (
              <div className="w-full mb-4 flex justify-between items-center">
                <div className="w-[48%] flex justify-between items-center">
                  <label className="w-[30%]" htmlFor="phoneNumber">
                    전화번호
                  </label>
                  <input
                    id="phoneNumber"
                    className="w-[70%] p-3 box-border border-[1px] border-solid border-[#e5e5e5] rounded-lg outline-none"
                    type="text"
                    onChange={(e) => checkPhonenumber(e)}
                    value={phoneNumber}
                    maxlength="11"
                    placeholder="전화번호를 입력하세요."
                    pattern="[0-9]+"
                  />
                </div>

                <div className="w-[48%] flex justify-between items-center">
                  <label className="w-[20%]" htmlFor="password">
                    비밀번호
                  </label>
                  <input
                    id="password"
                    className="w-[80%] p-3 box-border border-[1px] border-solid border-[#e5e5e5] rounded-lg outline-none"
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
                  value="사이즈문의"
                  key="사이즈문의"
                  className="hover:bg-black"
                >
                  사이즈문의
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

            <Button onClick={(e) => handleAddQuestionData(e)} value="등록" />
          </div>
        </DetailQuestionInputModal>
      )}

      {questionDetailModalOpen && (
        <DetailQuestionModal
          onClose={(e) => {
            e.preventDefault();
            setQuestionDetailModalOpen(false);
          }}
        >
          {questionData
            .filter((data) => data.id === QuestionModalIdBucket)
            .map((data) => {
              return (
                <div className="p-5 box-border">
                  <div className="pb-5 border-b-[1px] border-solid border-[#ccc]">
                    <div className="flex items-end">
                      <p className="text-[1rem] text-[#282828]">{`Q. ${data.questionType}`}</p>
                      <p className="ml-3 text-[0.9rem] text-[#909090] font-light">
                        {formatDate(data.date)}
                      </p>
                    </div>

                    <p className="mt-1 text-[0.9rem] text-[#5b5b5b]">
                      {user !== null
                        ? data?.userId?.slice(0, 4) + "***"
                        : data?.phoneNumber?.slice(0, 7) + "****"}
                    </p>
                  </div>
                  <p className="mt-5 mb-80 text-[1rem]">
                    {data.questionContent}
                  </p>

                  <div>
                    <button className="w-32 py-2 bg-black bg-opacity-100 border-[1px] border-solid border-black mt-6 rounded-lg text-[0.875rem] text-white hover:bg-transparent hover:text-black transition-all duration-700">
                      <p>수정</p>
                    </button>
                    <button
                      onClick={(e) => {
                        handleDeleteQuestion(e, data.id);
                      }}
                      className="w-32 py-2 ml-2 bg-black bg-opacity-100 border-[1px] border-solid border-black mt-6 rounded-lg text-[0.875rem] text-white hover:bg-transparent hover:text-black transition-all duration-700"
                    >
                      <p>삭제</p>
                    </button>
                  </div>
                </div>
              );
            })}
        </DetailQuestionModal>
      )}
    </div>
  );
}
