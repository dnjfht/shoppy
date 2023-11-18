import React, { useEffect, useMemo, useState } from "react";
import ChangePassword from "../../components/MyPage/UserAccount/ChangePassword";
import ChangeNickname from "../../components/MyPage/UserAccount/ChangeNickname";
import {
  MyPageWrapper,
  LeftBox,
  StyledImage,
  RightBox,
  UserNicknameDiv,
  UserText,
  UserContentDiv,
  ContentDiv,
  UserAccountDiv,
  UserHistoryDiv,
  RightWrapper,
  LogOutBtn,
  StyledIcons,
  HistoryCategory,
  CategoryImg,
  SaveBtn,
  ProductTypesBtn,
  RightSecondWrapper,
  ResponsiveMypage,
  ResUserAccount,
  ResUserHistory,
  ResUserTips,
  DeleteUser,
  ResCategoryTab,
} from "./style";
import { updatePassword, updateProfile, deleteUser } from "firebase/auth";
import { firebaseConfig } from "../../api/firebase";
import { RiLogoutBoxLine } from "react-icons/ri";
// import BookmarkPrdtList from "../../components/Mypage/BookmarkPrdtList";
import { authService } from "../../api/firebase";
import { useNavigate } from "react-router-dom";
//import UserWriteList from "../../components/Mypage/UserHistory/UserWriteList";
//import UserLikeList from "../../components/Mypage/UserHistory/UserLikeList";
import { CiLock } from "react-icons/ci";
import { GiCutDiamond } from "react-icons/gi";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RatingResult2 from "../../components/review/RatingResult2";
import { RiThumbUpFill } from "react-icons/ri";

function MyPage() {
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);

  // 리뷰 "도움이 돼요" 버튼 클릭 기능

  // async function handleClickBenefitBtn(e, productId, detailUserId) {
  //   console.log(detailUserId);
  //   e.preventDefault();

  //   // detailUserId로 된 게시물 찾기

  //   const findDetailUserIdReview = reviewData?.find((review) =>
  //     review?.detailUserId?.includes(detailUserId)
  //   );

  //   const findDetailUserIdReview2 = filteredReviews?.find((review) =>
  //     review?.detailUserId?.includes(detailUserId)
  //   );

  //   if (user) {
  //     // 화면에 수정된 게 바로 보이게끔 수정.
  //     setFilteredReviews((prev) =>
  //       prev.map((review) => {
  //         if (
  //           review?.productId === productId &&
  //           review?.detailUserId?.includes(detailUserId) &&
  //           review?.count?.filter((c) => c?.userId?.includes(user?.uid))
  //             .length === 0
  //         ) {
  //           return {
  //             ...review,
  //             count: [
  //               ...findDetailUserIdReview2?.count,
  //               { userId: user.uid, count: 1 },
  //             ],
  //           };
  //         } else if (
  //           review?.productId === productId &&
  //           review?.detailUserId?.includes(detailUserId) &&
  //           review?.count?.filter((c) => c?.userId?.includes(user?.uid))
  //             .length !== 0
  //         ) {
  //           return {
  //             ...review,
  //             count: review?.count?.map((c) => {
  //               return c?.count === 1 && c?.userId?.includes(user?.uid)
  //                 ? {
  //                     ...c,
  //                     count: 0,
  //                   }
  //                 : c?.count === 0 && c?.userId?.includes(user?.uid)
  //                 ? {
  //                     ...c,
  //                     count: 1,
  //                   }
  //                 : c;
  //             }),
  //           };
  //         } else {
  //           return review;
  //         }
  //       })
  //     );

  //     // 서버에 데이터 저장.
  //     await axios.post(
  //       `http://localhost:3001/review/${productId}/${detailUserId}`,
  //       {
  //         data: {
  //           ...findDetailUserIdReview,
  //           count:
  //             // detailUserId로 된 게시물(객체) 안 count라는 배열 안 userId에 현재 user.uid가 포함되어 있는 객체가 없을 때.
  //             findDetailUserIdReview.count.filter((c) =>
  //               c.userId.includes(user.uid)
  //             ).length === 0
  //               ? // 0이 맞다면 count라는 배열 안, 새롭게 현재 user.uid가 들어간 userId와 count 1을 넣어 객체 생성.
  //                 [
  //                   ...findDetailUserIdReview.count,
  //                   { userId: user.uid, count: 1 },
  //                 ]
  //               : // detailUserId로 된 게시물(객체) 안 count라는 배열 안 userId에 현재 user.uid가 포함되어 있는 객체가 있을 때.
  //                 findDetailUserIdReview.count.map((review) => {
  //                   if (
  //                     review.count === 1 &&
  //                     review.userId.includes(user.uid)
  //                   ) {
  //                     return {
  //                       ...review,
  //                       count: 0,
  //                     };
  //                   } else if (
  //                     review.count === 0 &&
  //                     review.userId.includes(user.uid)
  //                   ) {
  //                     return {
  //                       ...review,
  //                       count: 1,
  //                     };
  //                   }
  //                   return review;
  //                 }),
  //         },
  //       }
  //     );
  //   } else if (user === null) {
  //     alert("비회원은 좋아요를 누를 수 없습니다. 로그인을 해주세요.");
  //   }
  // }

  const { data: items, isLoading } = useQuery(["items"], async () => {
    const res = await axios.get("/data/Product.json");
    return res.data.items.products;
  });

  const productsId = useMemo(() => {
    return (
      items?.map((item) => {
        return item?.id;
      }) || []
    );
  }, [items]);
  // 모든 product들의 id가 담긴 배열

  productsId[Symbol.iterator] = function () {
    let index = 0;

    return {
      next: () => {
        if (index < this.length) {
          return { value: this[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  };

  // 리뷰 데이터 서버에서 가져오기.

  const [reviewData, setReviewData] = useState([]);
  const [inquiryData, setInquiryData] = useState([]);

  useEffect(() => {
    async function receiveReviewData() {
      const newReviewData = [];
      for (const id of productsId) {
        const resAll = await axios.get(
          `https://birthday-party-shop-backend-server.vercel.app/review/${id}`
        );
        if (resAll?.data?.length !== 0) {
          console.log(resAll?.data);
          newReviewData.push(...resAll?.data);
        }
      }

      setReviewData(newReviewData);
    }

    if (reviewData.length === 0) {
      receiveReviewData();
    }
  }, [isLoading, reviewData, productsId]);

  useEffect(() => {
    async function receiveInquiryData() {
      const newInquiryData = [];
      for (const id of productsId) {
        const resAll = await axios.get(
          `https://birthday-party-shop-backend-server.vercel.app/inquiry/${id}`
        );
        if (resAll?.data?.length !== 0) {
          console.log(resAll?.data);
          newInquiryData.push(...resAll?.data);
        }
      }

      setInquiryData(newInquiryData);
    }

    if (inquiryData.length === 0) {
      receiveInquiryData();
    }
  }, [isLoading, inquiryData, productsId]);

  console.log(reviewData, inquiryData);

  const navigate = useNavigate();
  // 세션스토리지에서 로그인했을 때 저장된 current user 가져오기
  const userSession = sessionStorage.getItem(
    `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
  );
  const currentUser = userSession ? JSON.parse(userSession) : null;
  const onLogoutClick = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      return authService.signOut().then(() => {
        sessionStorage.clear(); // ?
        alert("로그아웃 되었습니다.");

        navigate("/", { replace: true });
      });
    } else {
      return;
    }
  };

  const [tab, setTab] = useState(0);

  //마이페이지 기능구현 필요 state
  const user = authService.currentUser;
  console.log(user);

  const [btnValidation, setBtnValidation] = useState(true);

  const [productTypes, setProductTypes] = useState(1); //예금 적금

  //ChangePassword.jsx
  const [userPassword, setUserPassword] = useState(""); //현재 유저 패스워드
  const [editUserPassword, setEditUserPassword] = useState(""); //고치고 싶은 비밀번호
  const [inputValidationConfirm, setInputValidationConfirm] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [corfirmPasswordMessage, setConfirmPasswordMessage] = useState("");
  const [doubleCheckPasswordMessage, setDoubleCheckPasswordMessage] =
    useState("");
  //ChangeNickName.jsx
  //newNickname: 유저의 바꿀 닉네임 ,  name: 왼쪽박스 유저 네임
  const [newNickName, setNewNickName] = useState(currentUser?.displayName);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [name, setName] = useState(newNickName);
  const [isNickName, setIsNickName] = useState(false);

  //닉네임 업데이트 함수
  const clickUserUpdate = async (e) => {
    e.preventDefault();
    if (password !== userPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (window.confirm("개인정보를 수정 하시겠습니까?")) {
      await updateProfile(user, {
        displayName: newNickName,
      });
      await PasswordUpdateHanlder()
        .then(
          alert("개인정보 수정 완료"),
          setName(newNickName),
          setInputValidationConfirm(true),
          setBtnValidation(true),
          setNicknameMessage("")
        )
        .catch((error) => {
          alert(console.log(error));
        });
    } else {
      alert("개인정보 수정 취소");
    }
  };
  //비밀번호 바꾸기 함수
  const PasswordUpdateHanlder = async () => {
    await updatePassword(user, userPassword)
      .then(() => {
        console.log("password변경 성공");
      })
      .catch((error) => {
        console.log(error);
      });

    setPassword("");
    setUserPassword("");
    setEditUserPassword("");
    setPasswordMessage("");
    setConfirmPasswordMessage("");
    setDoubleCheckPasswordMessage("");
  };
  //유저 탈퇴 함수
  const deleteUserHandler = () => {
    if (
      window.confirm("확인 버튼을 누르면 탈퇴됩니다. 회원 탈퇴 하시겠습니까?")
    ) {
      deleteUser(user).then(() => {
        alert("삭제되었습니다");
        return navigate("/");
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    let filteredReviewList = reviewData;

    if (tab === 1) {
      filteredReviewList = filteredReviewList?.filter((review) => {
        console.log(user.uid);
        const matchingReview = review?.count?.filter(
          (c) => c?.userId === user?.uid && c?.count === 1
        );
        return matchingReview?.length > 0;
      });
    }

    if (tab === 2 && productTypes === 1) {
      filteredReviewList = filteredReviewList?.filter((review) => {
        return review?.userId === user?.uid;
      });
    }

    setFilteredReviews(filteredReviewList);
  }, [tab, reviewData, user, productTypes]);

  useEffect(() => {
    let filteredInquiryList = inquiryData;

    if (tab === 2 && productTypes === 2) {
      filteredInquiryList = filteredInquiryList?.filter((inquiry) => {
        return inquiry?.userId === user?.uid;
      });
    }

    setFilteredInquiries(filteredInquiryList);
  }, [tab, inquiryData, user, productTypes]);

  console.log(filteredReviews, filteredInquiries);

  return (
    <>
      <MyPageWrapper className="제일 큰 박스">
        {/* ###########  Left    ################# */}
        <LeftBox className="왼쪽 박스">
          {/* 유저 닉네임 확인 */}
          <UserNicknameDiv>
            <StyledImage
              src={
                user && user.photoURL
                  ? user.photoURL
                  : require("../../assets/defaultImage.png")
              }
              alt="유저사진"
            ></StyledImage>
            <h3 style={{ fontSize: "25px" }}>{name}</h3>
          </UserNicknameDiv>
          {/* 유저 이름,id,연락처 부분 */}
          <UserContentDiv>
            {/* 로그인 ID */}
            <ContentDiv>
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <p>로그인 ID</p>
                <p style={{ color: "#aaa" }}>{currentUser?.email}</p>
              </div>
              {/* 로그아웃 버튼 */}
              <LogOutBtn onClick={onLogoutClick}>
                <RiLogoutBoxLine />
                로그아웃
              </LogOutBtn>
            </ContentDiv>
          </UserContentDiv>
          {/* 유저 계정 변경 부분 (디폴트부분) */}
          <UserAccountDiv
            style={tab === 0 ? { backgroundColor: "#e6e8ea" } : null}
          >
            <CategoryImg>
              <p className="text-[1.4rem]">
                <CiLock />
              </p>
              <button
                onClick={() => {
                  setTab(0);
                }}
                style={{ fontSize: "20px" }}
              >
                계정 관리
              </button>
            </CategoryImg>
            <p>〉</p>
          </UserAccountDiv>
          {/* 히스토리 */}
          <UserHistoryDiv>
            <UserText
              style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}
            >
              히스토리
            </UserText>
            <HistoryCategory
              style={tab === 1 ? { backgroundColor: "#E6E8EA" } : null}
            >
              <CategoryImg>
                <p className="text-[1.4rem]">
                  <GiCutDiamond />
                </p>
                <button
                  onClick={() => {
                    setTab(1);
                  }}
                  style={{ fontSize: "18px" }}
                >
                  도움이 된 리뷰
                </button>
              </CategoryImg>
              <p>〉</p>
            </HistoryCategory>
            <HistoryCategory
              style={tab === 2 ? { backgroundColor: "#E6E8EA" } : null}
            >
              <CategoryImg>
                <p className="text-[1.4rem]">
                  <BiSolidMessageSquareEdit />
                </p>
                <button
                  onClick={() => {
                    setTab(2);
                  }}
                  style={{ fontSize: "18px" }}
                >
                  내 리뷰 / 문의
                </button>
              </CategoryImg>
              <p>〉</p>
            </HistoryCategory>
          </UserHistoryDiv>
        </LeftBox>
        {/* 여기는 반응형일때 나타날 구역 */}
        <ResponsiveMypage>
          <ResCategoryTab>
            <UserAccountDiv />
            <ResUserAccount onClick={() => setTab(0)}>
              <p>계정관리</p>
            </ResUserAccount>
            <ResUserHistory onClick={() => setTab(1)}>
              <p>도움이 된 리뷰</p>
            </ResUserHistory>
            <ResUserTips onClick={() => setTab(2)}>
              <p>내 리뷰 / 문의</p>
            </ResUserTips>
          </ResCategoryTab>
        </ResponsiveMypage>

        <RightBox className="오른쪽 박스">
          {tab === 0 && (
            <RightWrapper>
              <RightSecondWrapper>
                {/* <button style={{ display: "flex", position: "relative" }}>
                <MdTableRows fontSize="30px" />
              </button> */}
                <form
                  onSubmit={(e) => {
                    clickUserUpdate(e);
                  }}
                >
                  <ChangePassword
                    currentUser={currentUser} //현재의 유저 값
                    setBtnValidation={setBtnValidation} // 버튼 활성화
                    password={password} //새 비밀번호
                    setPassword={setPassword} //새 비밀번호
                    editUserPassword={editUserPassword} //현재 비밀번호
                    setEditUserPassword={setEditUserPassword} //현재 비밀번호
                    userPassword={userPassword} //새 비밀번호 확인
                    setUserPassword={setUserPassword} //새 비밀번호 확인
                    inputValidationConfirm={inputValidationConfirm} // 3번째 input 활성화
                    setInputValidationConfirm={setInputValidationConfirm} // 3번째 input 활성화
                    passwordMessage={passwordMessage}
                    setPasswordMessage={setPasswordMessage}
                    corfirmPasswordMessage={corfirmPasswordMessage}
                    setConfirmPasswordMessage={setConfirmPasswordMessage}
                    doubleCheckPasswordMessage={doubleCheckPasswordMessage}
                    setDoubleCheckPasswordMessage={
                      setDoubleCheckPasswordMessage
                    }
                  />

                  <ChangeNickname
                    name={name}
                    isNickName={isNickName}
                    newNickName={newNickName}
                    setIsNickName={setIsNickName}
                    setNewNickName={setNewNickName}
                    nicknameMessage={nicknameMessage}
                    setNicknameMessage={setNicknameMessage}
                    setBtnValidation={setBtnValidation}
                  />

                  <SaveBtn
                    disabled={btnValidation}
                    style={
                      btnValidation === true
                        ? { backgroundColor: "#aaa" }
                        : null
                    }
                  >
                    변경사항 저장
                  </SaveBtn>
                </form>
              </RightSecondWrapper>
              <DeleteUser
                onClick={() => {
                  deleteUserHandler();
                }}
              >
                <p
                  style={{
                    color: "#888",
                    cursor: "pointer",
                    marginTop: "4px",
                    marginRight: "20px",
                    fontSize: "0.9rem",
                  }}
                >
                  회원 탈퇴하기
                </p>
              </DeleteUser>
            </RightWrapper>
          )}

          {tab === 1 && (
            <div className="w-full pt-32 flex flex-wrap items-start">
              {filteredReviews &&
                filteredReviews?.map((review, index) => {
                  return (
                    <div
                      className={`${
                        index % 5 === 4 ? "mr-0" : "mr-[2.5%]"
                      } w-[18%] shadow-[0_35px_18px_-15px_rgba(0,0,0,0.3)]`}
                    >
                      <img
                        className="w-full object-cover rounded-t-lg"
                        src={process.env.PUBLIC_URL + `/../${review?.image}`}
                        alt="product_img"
                      />
                      <div className="w-full bg-[#282828] p-4 box-border rounded-b-lg cursor-pointer">
                        <div className="w-full mb-4 flex justify-between items-center">
                          <p className="inline-block py-1 px-3 text-[0.88rem] text-[#ff4273] border-[1px] border-solid border-[#ff4273]">
                            상품 리뷰
                          </p>
                          {/* <button
                            onClick={(e) =>
                              handleClickBenefitBtn(
                                e,
                                review?.productId,
                                review?.detailUserId
                              )
                            }
                            className="w-8 h-8 border-[1px] border-solid border-[#fff] rounded-full flex justify-center items-center"
                          >
                            <p
                              className={`${
                                review?.count?.find((c) =>
                                  c?.userId?.includes(user?.uid)
                                )?.count === 1
                                  ? "text-[#ff4273]"
                                  : "text-white"
                              } text-[1rem] font-black`}
                            >
                              <RiThumbUpFill />
                            </p>
                          </button> */}
                        </div>

                        <div className="w-full pb-4 flex items-end border-b-[1px] border-solid border-[#a8a8a8]">
                          {review?.profileImgSrc ? (
                            <img
                              className="w-10 mr-2 object-cover rounded-full"
                              src={review?.profileImgSrc}
                              alt="profile_img"
                            />
                          ) : (
                            <img
                              className="w-10 mr-2 object-cover rounded-full"
                              src={
                                process.env.PUBLIC_URL +
                                "/image/defaultImage.png"
                              }
                              alt="profile_img"
                            />
                          )}

                          <p className="text-[0.9rem] text-[#fff]">
                            {review?.profileDisplayName
                              ? review?.profileDisplayName
                              : review?.phoneNumber?.substring(0, 7) + "****"}
                          </p>
                        </div>
                        <div className="w-full pt-4">
                          <RatingResult2 ratingValue={review?.ratingValue} />
                          <p className="text-[#fff] text-[0.94rem]">
                            {review?.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          {tab === 2 && (
            <div className="w-full pt-32 flex flex-wrap items-start">
              <div className="w-full">
                <ProductTypesBtn
                  style={
                    productTypes === 1
                      ? {
                          backgroundColor: "#ff4273",
                          color: "white",
                          marginRight: "10px",
                        }
                      : {
                          backgroundColor: "white",
                          color: "black",
                          marginRight: "10px",
                        }
                  }
                  onClick={() => {
                    setProductTypes(1);
                  }}
                >
                  리뷰글
                </ProductTypesBtn>
                <ProductTypesBtn
                  style={
                    productTypes === 2
                      ? { backgroundColor: "#ff4273", color: "white" }
                      : { backgroundColor: "white", color: "black" }
                  }
                  onClick={() => {
                    setProductTypes(2);
                  }}
                >
                  문의글
                </ProductTypesBtn>

                {tab === 2 && productTypes === 1 && (
                  <div className="w-full mt-8 flex flex-wrap items-start">
                    {filteredReviews &&
                      filteredReviews?.map((review, index) => {
                        return (
                          <div
                            className={`${
                              index % 5 === 4 ? "mr-0" : "mr-[2.5%]"
                            } w-[18%] shadow-[0_35px_18px_-15px_rgba(0,0,0,0.3)]`}
                          >
                            <img
                              className="w-full object-cover rounded-t-lg"
                              src={
                                process.env.PUBLIC_URL + `/../${review?.image}`
                              }
                              alt="product_img"
                            />
                            <div className="w-full bg-[#282828] p-4 box-border rounded-b-lg cursor-pointer">
                              <div className="w-full mb-4 flex justify-between items-center">
                                <p className="inline-block py-1 px-3 text-[0.88rem] text-[#ff4273] border-[1px] border-solid border-[#ff4273]">
                                  상품 리뷰
                                </p>
                              </div>

                              <div className="w-full pb-4 flex items-end border-b-[1px] border-solid border-[#a8a8a8]">
                                {review?.profileImgSrc ? (
                                  <img
                                    className="w-10 mr-2 object-cover rounded-full"
                                    src={review?.profileImgSrc}
                                    alt="profile_img"
                                  />
                                ) : (
                                  <img
                                    className="w-10 mr-2 object-cover rounded-full"
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/image/defaultImage.png"
                                    }
                                    alt="profile_img"
                                  />
                                )}

                                <p className="text-[0.9rem] text-[#fff]">
                                  {review?.profileDisplayName
                                    ? review?.profileDisplayName
                                    : review?.phoneNumber?.substring(0, 7) +
                                      "****"}
                                </p>
                              </div>
                              <div className="w-full pt-4">
                                <RatingResult2
                                  ratingValue={review?.ratingValue}
                                />
                                <p className="text-[#fff] text-[0.94rem]">
                                  {review?.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

                {tab === 2 && productTypes === 2 && (
                  <div className="w-full mt-8 flex flex-wrap items-start">
                    {filteredInquiries &&
                      filteredInquiries?.map((inquiry, index) => {
                        return (
                          <div
                            className={`${
                              index % 5 === 4 ? "mr-0" : "mr-[2.5%]"
                            } w-[18%] shadow-[0_35px_18px_-15px_rgba(0,0,0,0.3)]`}
                          >
                            <img
                              className="w-full object-cover rounded-t-lg"
                              src={
                                process.env.PUBLIC_URL + `/../${inquiry?.image}`
                              }
                              alt="product_img"
                            />
                            <div className="w-full bg-[#282828] p-4 box-border rounded-b-lg cursor-pointer">
                              <div className="w-full mb-4 flex justify-between items-center">
                                <p className="inline-block py-1 px-3 text-[0.88rem] text-[#ff4273] border-[1px] border-solid border-[#ff4273]">
                                  상품 문의
                                </p>
                              </div>

                              <div className="w-full pb-4 flex items-end border-b-[1px] border-solid border-[#a8a8a8]">
                                <img
                                  className="w-10 mr-2 object-cover rounded-full"
                                  src={inquiry?.profileImgSrc}
                                  alt="profile_img"
                                />

                                <p className="text-[0.9rem] text-[#fff]">
                                  {inquiry?.profileDisplayName}
                                </p>
                              </div>
                              <div className="w-full pt-4">
                                <p className="mb-2 text-[#fff] text-[1.06rem]">
                                  : {inquiry?.questionType}
                                </p>
                                <p className="text-[#fff] text-[0.94rem]">
                                  {inquiry?.questionContent}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          )}
        </RightBox>
      </MyPageWrapper>
    </>
  );
}

export default MyPage;
