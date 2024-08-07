import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import DetailQuestionInputModal from "./DetailQuestionInputModal";
import Button from "../../button/Button";
import DetailQuestionList, { formatDate } from "./DetailQuestionList";
import DetailQuestionModal from "./DatailQuestionModal";

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

  // 문의 상세페이지 모달 관련 useState
  const [questionDetailModalOpen, setQuestionDetailModalOpen] = useState(false);
  const [QuestionModalIdBucket, setQuestionModalIdBucket] = useState("");
  // 문의 상세페이지 모달 수정
  const [questionDetailModalEdit, setQuestionDetailModalEdit] = useState(false);
  const [questionDetailModalEditIdBucket, setQuestionDetailModalEditIdBucket] =
    useState("");
  const [changeContent, setChangeContent] = useState("");

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

  const queryClient = useQueryClient();

  // 서버에서 문의글 데이터 받아오기
  const { data: firestoreInquiryData } = useQuery(
    ["firestoreInquiryData", item?.id],
    async () => {
      const resAll = await axios.get(
        `https://birthday-party-shop-backend-server.vercel.app/inquiry/${item?.id}`
      );
      return resAll.data.filter((inquiry) => inquiry.questionContent != null);
    }
  );

  // 문의 생성.
  const createInquiry = async (inquiryData) => {
    if (user) {
      try {
        const res = await axios.post(
          `https://birthday-party-shop-backend-server.vercel.app/inquiry/${
            item.id
          }/${user.uid}${
            firestoreInquiryData.filter((data) => data.userId === user.uid)
              .length + 1
          }`,
          inquiryData
        );
        console.log(res.config.data["data"]);
        return res.config.data["data"];
      } catch (error) {
        throw error;
      }
    } else if (user === null) {
      try {
        const res = await axios.post(
          `https://birthday-party-shop-backend-server.vercel.app/inquiry/${
            item.id
          }/${phoneNumber}${
            firestoreInquiryData.filter(
              (data) => data.phoneNumber === phoneNumber
            ).length + 1
          }`,
          inquiryData
        );
        console.log(res.config.data["data"]);
        return res.config.data["data"];
      } catch (error) {
        throw error;
      }
    }
  };

  const createInquiryMutation = useMutation(
    (inquiryData) => createInquiry(inquiryData),
    {
      onSuccess: () => {
        // 성공적으로 리뷰를 작성한 경우, 데이터를 다시 불러와서 업데이트.
        queryClient.invalidateQueries(["firestoreInquiryData", item?.id]);
        console.log(firestoreInquiryData);
      },
    }
  );

  async function handleAddQuestionData(e) {
    e.preventDefault();

    if (user) {
      // 리뷰 등록
      if (questionType !== "" && questionContent !== "") {
        const inquiryData = {
          data: {
            profileImgSrc: user.photoURL,
            profileDisplayName: user.displayName,
            image: item.image,
            productId: item.id,
            id: uuidv4(),
            date: Date.now(),
            userId: user.uid,
            detailUserId:
              user.uid +
              String(
                firestoreInquiryData.filter((data) => data.userId === user.uid)
                  .length + 1
              ),
            questionType: questionType,
            questionContent: questionContent,
          },
        };

        createInquiryMutation.mutate(inquiryData);

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
        const inquiryData = {
          data: {
            image: item.image,
            productId: item.id,
            id: uuidv4(),
            date: Date.now(),
            detailUserId:
              phoneNumber +
              String(
                firestoreInquiryData.filter(
                  (data) => data.phoneNumber === phoneNumber
                ).length + 1
              ),
            phoneNumber: phoneNumber,
            password: password,
            questionType: questionType,
            questionContent: questionContent,
          },
        };

        createInquiryMutation.mutate(inquiryData);

        setQuestionType("");
        setQuestionContent("");

        setQuestionModalOpen(false);
      } else {
        alert("빈 칸을 채워주세요.");
      }
    }
  }

  useEffect(() => {
    setPhoneNumber("");
    setPassword("");
  }, [firestoreInquiryData]);

  // 문의 삭제
  const deleteInquiry = async ({ detailUserId, inquiryData }) => {
    try {
      console.log(inquiryData);
      const res = await axios.post(
        `https://birthday-party-shop-backend-server.vercel.app/inquiry/${item?.id}/${detailUserId}`,
        inquiryData
      );
      console.log(res.config.data["data"]);
      return res.config.data["data"];
    } catch (error) {
      throw error;
    }
  };

  const deleteInquiryMutation = useMutation(
    ({ detailUserId, inquiryData }) =>
      deleteInquiry({ detailUserId, inquiryData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["firestoreInquiryData", item?.id]);
        console.log(firestoreInquiryData);
      },
    }
  );

  async function handleDeleteQuestion(e, detailUserId) {
    e.preventDefault();

    const result = window.confirm("게시물을 삭제하시겠습니까?");

    if (result) {
      // setQuestionData((prev) => prev.filter((data) => data.id !== idx));
      setQuestionDetailModalOpen(false);

      const inquiryData = {
        data: {},
      };

      deleteInquiryMutation.mutate({ detailUserId, inquiryData });
    } else {
      return;
    }
  }

  // 문의 수정
  const handleEditQuestion = (e, idx) => {
    e.preventDefault();

    const result = window.confirm("게시물을 수정하시겠습니까?");

    if (result) {
      setQuestionDetailModalEdit(true);
      setQuestionDetailModalEditIdBucket(idx);
    }
  };

  const editInquiry = async ({ detailUserId, inquiryData }) => {
    try {
      const res = await axios.post(
        `https://birthday-party-shop-backend-server.vercel.app/inquiry/${item?.id}/${detailUserId}`,
        inquiryData
      );
      console.log(res.config.data["data"]);
      return res.config.data["data"];
    } catch (error) {
      throw error;
    }
  };

  const editInquiryMutation = useMutation(
    ({ detailUserId, inquiryData }) =>
      editInquiry({ detailUserId, inquiryData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["firestoreInquiryData", item?.id]);
        console.log(firestoreInquiryData);
      },
    }
  );

  async function handleEditQuestionSuccess(e, detailUserId) {
    e.preventDefault();

    const inquiryData = {
      data: {
        ...firestoreInquiryData.find((inquiry) =>
          inquiry.detailUserId.includes(detailUserId)
        ),
        questionContent: changeContent,
      },
    };

    // 문의 수정
    editInquiryMutation.mutate({ detailUserId, inquiryData });

    setQuestionDetailModalEditIdBucket("");
    setQuestionDetailModalEdit(false);
  }

  console.log(firestoreInquiryData);

  return (
    <div className="w-full py-14 text-[0.875rem] overflow-hidden relative">
      <div className="flex items-center justify-between w-full">
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
        firestoreInquiryData={firestoreInquiryData}
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
          <div className="box-border w-full p-4">
            {!user && (
              <div className="flex items-center justify-between w-full mb-4">
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
            <div className="flex items-center w-full">
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

            <div className="flex items-center w-full mt-4">
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
          {firestoreInquiryData &&
            firestoreInquiryData
              ?.filter((data) => data.id === QuestionModalIdBucket)
              ?.map((data) => {
                return (
                  <div className="box-border p-5">
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

                    {questionDetailModalEdit &&
                    questionDetailModalEditIdBucket === data.id ? (
                      <form
                        onSubmit={(e) => {
                          handleEditQuestionSuccess(e, data.detailUserId);
                        }}
                      >
                        <div className="flex items-center justify-between w-full mt-5 mb-80">
                          <input
                            value={changeContent}
                            onChange={(e) => {
                              e.preventDefault();
                              setChangeContent(e.target.value);
                            }}
                            type="text"
                            placeholder="수정할 내용을 입력하세요."
                            className="w-4/5 p-3 box-border border-[1px] border-solid border-[#ccc] rounded-lg outline-none"
                          />
                          <button className="w-[18%] py-3 bg-black bg-opacity-100 border-[1px] border-solid border-black rounded-lg text-[0.875rem] text-white hover:bg-transparent hover:text-black transition-all duration-700">
                            수정 완료
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p className="mt-5 mb-80 text-[1rem]">
                        {data.questionContent}
                      </p>
                    )}

                    <div>
                      {questionDetailModalEditIdBucket !== data.id && (
                        <button
                          onClick={(e) => {
                            handleEditQuestion(e, data.id);
                          }}
                          className="w-32 py-3 bg-black bg-opacity-100 border-[1px] border-solid border-black mt-6 rounded-lg text-[0.875rem] text-white hover:bg-transparent hover:text-black transition-all duration-700"
                        >
                          <p>수정</p>
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          handleDeleteQuestion(e, data.detailUserId);
                        }}
                        className={`${
                          questionDetailModalEditIdBucket !== data.id
                            ? "ml-2"
                            : ""
                        } w-32 py-3 bg-black bg-opacity-100 border-[1px] border-solid border-black mt-6 rounded-lg text-[0.875rem] text-white hover:bg-transparent hover:text-black transition-all duration-700`}
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
