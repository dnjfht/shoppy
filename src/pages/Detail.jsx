import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { attach_won, shortString } from "./Main";
import { v4 as uuidv4 } from "uuid";
import { loadCartServer, setCartServer } from "../api/firebase";

import { GoX } from "react-icons/go";
import { CiHeart, CiGift, CiDeliveryTruck, CiEdit } from "react-icons/ci";
import { PiShareNetworkThin } from "react-icons/pi";
import { RiCoupon3Fill } from "react-icons/ri";
import { GiCutDiamond } from "react-icons/gi";
import { HiGift } from "react-icons/hi";
import { MdFiberNew } from "react-icons/md";
import DetailInfo from "../components/DetailInfo";
import DetailQuestion from "../components/question/DetailQuestion";
import DetailReview from "../components/review/DetailReview";
import DetailCS from "../components/DetailCS";
import Modal from "../components/review/Modal";
import BasicRating from "../components/review/BasicRating";
import Button from "../components/Button";
import DetailReviewModal from "../components/review/DetailReviewModal";
import RatingResult2 from "../components/review/RatingResult2";
import MyBodySizeModal from "../components/review/MyBodySizeModal";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Detail({ user }) {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [cart, setCart] = useState([]);
  const [cat, setCat] = useState("상품정보");

  // 리뷰 입력 모달
  const [modalOpen, setModalOpen] = useState(false);

  // 상세 리뷰 모달 띄우는 useState
  const [reviewDetailModalOpen, setReviewDetailModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  // 나의 체형 정보 입력 모달
  const [myBodySizeModalOpen, setMyBodySizeModalOpen] = useState(false);

  // review 관련 상태 관리

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  // 초기 별점 값으로 0.0을 가집니다.
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewColor, setReviewColor] = useState("");
  const [reviewSize, setReviewSize] = useState("");
  const [reviewHeight, setReviewHeight] = useState("");
  const [reviewWeight, setReviewWeight] = useState("");
  const [reviewBodySize, setReviewBodySize] = useState("");
  const [reviewBodyFoot, setReviewBodyFoot] = useState("");
  const [reviewColorSatisfaction, setReviewColorSatisfaction] = useState("");
  const [reviewSizeSatisfaction, setReviewSizeSatisfaction] = useState("");
  const [content, setContent] = useState("");

  // 내 체형 등록 useState
  const [myHeight, setMyHeight] = useState("");
  const [myWeight, setMyWeight] = useState("");
  const [mySize, setMySize] = useState("");
  const [myFootSize, setMyFootSize] = useState("");
  const [myBodyInfo, setMyBodyInfo] = useState(null);

  const colorInputRef = useRef(null);
  const sizeInputRef = useRef(null);
  const colorInputRef2 = useRef(null);
  const sizeInputRef2 = useRef(null);

  // review 수정 useState
  const [reviewEdit, setReviewEdit] = useState({ isActive: false });
  const [changeText, setChangeText] = useState("");

  const navigate = useNavigate();

  const {
    state: { item },
  } = useLocation();

  const handleSelectColor = (e) => {
    setColor(e.target.value);
  };

  const handleSelectSize = (e, selectedColor) => {
    setSize(e.target.value);

    if (selectedColor === "" || e.target.value === "") {
      alert("옵션을 선택해주세요.");
    } else {
      const existingProductIndex = cart.findIndex((item) => {
        return item.color === selectedColor && item.size === e.target.value;
      });

      if (existingProductIndex !== -1) {
        setCart((prev) =>
          prev.map((item, index) => {
            return index === existingProductIndex
              ? { ...item, count: item.count + 1 }
              : item;
          })
        );
      } else {
        if (user === null) {
          const productInfo = {
            id: uuidv4(),
            title: item.title,
            image: item.image,
            color: selectedColor,
            size: e.target.value,
            count: 1,
            price: item.salePrice,
          };

          setCart((prev) => [...prev, productInfo]);
        } else if (user) {
          const productInfo2 = {
            userId: user.uid,
            id: uuidv4(),
            title: item.title,
            image: item.image,
            color: selectedColor,
            size: e.target.value,
            count: 1,
            price: item.salePrice,
          };

          setCart((prev) => [...prev, productInfo2]);
        }
      }

      colorInputRef.current.value = "- [필수] 옵션을 선택해 주세요 -";
      sizeInputRef.current.value = "- [필수] 옵션을 선택해 주세요 -";
    }
  };

  const deleteCart = (idx) => {
    setCart((prevCart) => prevCart.filter((c) => c.id !== idx));
  };

  const handleMinusCount = (idx) => {
    setCart((prevCart) =>
      prevCart.map((c) => {
        return c.id === idx && c.count > 0 ? { ...c, count: c.count - 1 } : c;
      })
    );
  };

  const handlePlusCount = (idx) => {
    setCart((prevCart) =>
      prevCart.map((c) => {
        return c.id === idx ? { ...c, count: c.count + 1 } : c;
      })
    );
  };

  const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );

  const category = ["상품정보", "사용후기", "교환 및 반품", "상품문의"];

  const handlePushCarts = async () => {
    if (user) {
      // Instead of updating local cart, update the allCarts in the App component.
      // setAllCarts((prevAllCarts) => [...prevAllCarts, ...cart]);

      const prevCart = (await loadCartServer(user)) ?? [];
      await setCartServer(user, [...prevCart, ...cart]);

      setCart([]); // Clear the local cart after adding items to allCarts
    } else if (user === null) {
      setCart([]);

      const previousCart = JSON.parse(localStorage.getItem("carts")) || [];

      // 이전 배열과 새로운 배열 합치기
      const mergedCart = [...previousCart, ...cart];

      // 합쳐진 배열을 다시 localStorage에 저장
      localStorage.setItem("carts", JSON.stringify(mergedCart));
    }
    navigate("/carts");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSelectColor2 = (e) => {
    setReviewColor(e.target.value);
  };

  const handleSelectsize2 = (e) => {
    setReviewSize(e.target.value);
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

  // 리뷰 작성시 핏이나 만족감 작성에 관한 Byte 제한 걸기
  const minBytes = 10;
  const maxBytes = 1000;

  const handleContentChange = (event) => {
    const input = event.target.value;
    if (minBytes <= input.length <= maxBytes) {
      setContent(input);
    }
  };

  const remainingBytes = maxBytes - content.length;

  // 리뷰 데이터 서버에서 가져오기.
  // 이건 user가 존재하건 존재하지 않건 가져올 수 있어야 함.
  const { data: firestoreReviewData } = useQuery(
    ["firestoreReviewData", item?.id],
    async () => {
      const resAll = await axios.get(
        `http://localhost:3001/review/${item?.id}`
      );
      console.log(resAll);
      return resAll.data.filter((review) => review.reviewWeight != null);
    }
  );

  // 리뷰 생성.
  const createReview = async (reviewData) => {
    if (user) {
      try {
        const res = await axios.post(
          `http://localhost:3001/review/${item.id}/${user.uid}${
            firestoreReviewData.filter((data) => data.userId === user.uid)
              .length + 1
          }`,
          reviewData
        );
        console.log(res.config.data["data"]);
        return res.config.data["data"];
      } catch (error) {
        throw error;
      }
    } else if (user === null) {
      try {
        const res = await axios.post(
          `http://localhost:3001/review/${item.id}/${phoneNumber}${
            firestoreReviewData.filter(
              (data) => data.phoneNumber === phoneNumber
            ).length + 1
          }`,
          reviewData
        );
        console.log(res.config.data["data"]);
        return res.config.data["data"];
      } catch (error) {
        throw error;
      }
    }
  };

  // const userCreateReviewMutation = useMutation(createReview, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["firestoreReviewData", item?.id]);

  //     console.log(firestoreReviewData);
  //   },
  //   onError: (error) => {
  //     // 여기에 오류 처리 로직을 추가합니다. 예를 들어, console.error(error.message);
  //   },
  // });

  const createReviewMutation = useMutation(
    (reviewData) => createReview(reviewData),
    {
      onSuccess: () => {
        // 성공적으로 리뷰를 작성한 경우, 데이터를 다시 불러와서 업데이트.
        queryClient.invalidateQueries(["firestoreReviewData", item?.id]);
        console.log(firestoreReviewData);
      },
    }
  );

  const handleStoreReviewData = (e) => {
    e.preventDefault();

    if (user) {
      // 후기 등록
      const reviewData = {
        data: {
          profileImgSrc: user.photoURL,
          profileDisplayName: user.displayName,
          userId: user.uid,
          detailUserId:
            user.uid +
            String(
              firestoreReviewData.filter((data) => data.userId === user.uid)
                .length + 1
            ),
          productId: item.id,
          image: item.image,
          id: uuidv4(),
          createdAt: Date.now(),
          reviewColor: reviewColor,
          reviewSize: reviewSize,
          reviewWeight: reviewWeight,
          reviewHeight: reviewHeight,
          reviewBodySize: reviewBodySize,
          reviewBodyFoot: reviewBodyFoot,
          ratingValue: ratingValue,
          reviewColorSatisfaction: reviewColorSatisfaction,
          reviewSizeSatisfaction: reviewSizeSatisfaction,
          content: content,
          count: 0,
        },
      };

      createReviewMutation.mutate(reviewData);
    } else if (user === null) {
      const reviewData = {
        data: {
          phoneNumber: phoneNumber,
          password: password,
          detailUserId:
            phoneNumber +
            String(
              firestoreReviewData.filter(
                (data) => data.phoneNumber === phoneNumber
              ).length + 1
            ),
          productId: item.id,
          image: item.image,
          id: uuidv4(),
          createdAt: Date.now(),
          reviewColor: reviewColor,
          reviewSize: reviewSize,
          reviewWeight: reviewWeight,
          reviewHeight: reviewHeight,
          reviewBodySize: reviewBodySize,
          reviewBodyFoot: reviewBodyFoot,
          ratingValue: ratingValue,
          reviewColorSatisfaction: reviewColorSatisfaction,
          reviewSizeSatisfaction: reviewSizeSatisfaction,
          content: content,
          count: 0,
        },
      };

      createReviewMutation.mutate(reviewData);
    }
    setReviewColor("");
    setReviewSize("");
    setReviewHeight("");
    setReviewWeight("");
    setReviewBodySize("");
    setReviewBodyFoot("");
    setRatingValue(0);
    setReviewColorSatisfaction("");
    setReviewSizeSatisfaction("");
    setContent("");
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    setPhoneNumber("");
    setPassword("");
  }, [firestoreReviewData]);

  // 리뷰 슬라이드 이미지 클릭 시 모달 열기
  const openReviewDetailModal = (id) => {
    setSelectedReviewId(id);
    setReviewDetailModalOpen(true);
  };

  // 리뷰 슬라이드 이미지 클릭 시 모달 닫기
  const closeReviewDetailModal = () => {
    setSelectedReviewId(null);
    setReviewDetailModalOpen(false);
  };

  async function handleClickBenefitBtn(e) {
    e.preventDefault();

    // setReviewData((prev) =>
    //   prev.map((item) => {
    //     return item.id === idx
    //       ? {
    //           ...item,
    //           count: item.count === 0 ? item.count + 1 : item.count - 1,
    //         }
    //       : item;
    //   })
    // );
  }

  // 리뷰 삭제
  const deleteReview = async ({ detailUserId, reviewData }) => {
    try {
      console.log(reviewData);
      const res = await axios.post(
        `http://localhost:3001/review/${item?.id}/${detailUserId}`,
        reviewData
      );
      console.log(res.config.data["data"]);
      return res.config.data["data"];
    } catch (error) {
      throw error;
    }
  };

  const deleteReviewMutation = useMutation(
    ({ detailUserId, reviewData }) =>
      deleteReview({ detailUserId, reviewData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["firestoreReviewData", item?.id]);
        console.log(firestoreReviewData);
      },
    }
  );

  async function handleDeleteReview(e, pw, detailUserId) {
    e.preventDefault();

    setReviewDetailModalOpen(false);

    const reviewData = {
      data: {},
    };

    if (user) {
      deleteReviewMutation.mutate({ detailUserId, reviewData });
    } else if (user === null) {
      const password = window.prompt(
        "비밀번호 네 자리를 입력하세요.(비밀번호는 숫자로 이루어져 있습니다.)"
      );

      if (password === pw) {
        deleteReviewMutation.mutate({ detailUserId, reviewData });
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  }

  // 리뷰 수정
  const handleEditReview = (e, pw, idx) => {
    e.preventDefault();

    if (user) {
      setReviewEdit((prev) => ({ ...prev, id: idx, isActive: true }));
    } else if (user === null) {
      const password = window.prompt(
        "비밀번호 네 자리를 입력하세요.(비밀번호는 숫자로 이루어져 있습니다.)"
      );

      if (password === pw) {
        setReviewEdit((prev) => ({ ...prev, id: idx, isActive: true }));
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  const editReview = async ({ detailUserId, editReviewData }) => {
    try {
      const res = await axios.post(
        `http://localhost:3001/review/${item?.id}/${detailUserId}`,
        editReviewData
      );
      console.log(res.config.data["data"]);
      return res.config.data["data"];
    } catch (error) {
      throw error;
    }
  };

  const editReviewMutation = useMutation(
    ({ detailUserId, editReviewData }) =>
      editReview({ detailUserId, editReviewData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["firestoreReviewData", item?.id]);
        console.log(firestoreReviewData);
      },
    }
  );

  // 리뷰 수정 완료
  async function handleEditReviewSuccess(e, detailUserId) {
    e.preventDefault();

    const editReviewData = {
      data: {
        ...firestoreReviewData.find((review) =>
          review.detailUserId.includes(detailUserId)
        ),
        content: changeText,
      },
    };

    // 후기 수정
    editReviewMutation.mutate({ detailUserId, editReviewData });

    setReviewEdit((prev) => ({ ...prev, id: "", isActive: false }));
  }

  // 내 체형 리뷰만 보기 버튼 클릭시 모달 열기
  const openMyBodySizeModal = (id) => {
    setMyBodySizeModalOpen(true);
  };

  // 내 체형 리뷰만 보기 버튼 클릭시 모달 닫기
  const closeMyBodySizeModal = () => {
    setMyBodySizeModalOpen(false);
  };

  // 내 체형 등록하기
  async function handleStoreBodySizeInfo(e) {
    e.preventDefault();

    setMyBodyInfo((prev) => ({
      ...prev,
      myHeight,
      myWeight,
      mySize,
      myFootSize,
    }));

    // 체형 정보 서버에 등록.
    if (user) {
      await axios.post(`http://localhost:3001/body/${user.uid}`, {
        data: {
          myHeight,
          myWeight,
          mySize,
          myFootSize,
        },
      });
    } else if (user === null) {
      const previousBodyInfo = JSON.parse(localStorage.getItem("bodyInfo"));

      // 이전 객체에서 새로 바뀐 것들만 적용되도록
      const mergedBodyInfo = {
        ...previousBodyInfo,
        ...{ myHeight, myWeight, mySize, myFootSize },
      };

      // 합쳐진 객체를 다시 localStorage에 저장
      localStorage.setItem("bodyInfo", JSON.stringify(mergedBodyInfo));
    }

    setMyBodySizeModalOpen(false);
  }

  // 체형 정보 서버에서 가져오기.
  const { data: bodyData } = useQuery(
    ["firestoreBodyData", user?.uid],
    async () => {
      const res = await axios.get(`http://localhost:3001/body/${user?.uid}`);
      return res.data;
    },
    {
      enabled: !!user?.uid, // userUid가 존재할 때만 데이터를 가져오도록 설정
    }
  );

  useEffect(() => {
    if (user === null) {
      const bodyInfo = JSON.parse(localStorage.getItem("bodyInfo"));
      setMyBodyInfo(bodyInfo);
    }
  }, [user, setMyBodyInfo]);

  // myBodyInfo의 내용이 변경될시 받아온 data를 재업데이트 하도록 설정
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user && bodyData && myBodyInfo) {
      queryClient.invalidateQueries(["firestoreBodyData", user?.uid]);
    }
  }, [myBodyInfo, user, queryClient, bodyData]);

  useEffect(() => {
    if (user && bodyData) {
      setMyBodyInfo(bodyData);
    }
  }, [user, bodyData]);

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto pt-52 pb-20 flex flex-col justify-between">
        <div className="w-full pb-32 border-b-[1px] border-bottom border-[#ccc] flex justify-between">
          <div className="w-[47%]">
            <img
              className="w-full object-cover"
              src={process.env.PUBLIC_URL + `/../${item.image}`}
              alt="item_img"
            />
          </div>

          <div className="w-[47%]">
            <div className="w-full pb-[30px] border-b-[1px] border-solid border-[#ccc]">
              <div className="w-full flex items-center justify-between">
                <div className="w-4/5 flex">
                  {item?.banner?.map((b) => {
                    return (
                      <p
                        className={`${
                          b === "new"
                            ? "border-[deeppink] text-[deeppink]"
                            : "border-[#30d0b3] text-[#30d0b3]"
                        } w-20 p-1 mr-2 border-[1px] border-solid text-[0.8rem] flex justify-center items-center`}
                      >
                        {b}
                      </p>
                    );
                  })}
                </div>

                <div className="w-1/5 text-[1.8rem] flex justify-end">
                  <button>
                    <CiHeart />
                  </button>

                  <button className="ml-3">
                    <PiShareNetworkThin />
                  </button>
                </div>
              </div>

              <h1 className="text-[1.5rem] text-[#282828] font-semibold mt-2">
                {item.title}
              </h1>

              <div className="mt-1 text-[#f98888] text-[1.5rem] font-semibold flex items-baseline">
                <h1>{salePercent(item.price, item.salePrice)}</h1>
                <h1 className="ml-2">{attach_won(item.salePrice)}</h1>
                <h1 className="ml-1 text-[1.125rem] text-[#aaa] font-normal line-through">
                  {attach_won(item.price)}
                </h1>
              </div>
            </div>

            <div className="w-full py-[30px] text-[0.875rem] text-[#999] font-semibold pb-[30px] border-b-[1px] border-solid border-[#ccc]">
              <div className="w-full mb-3 flex items-center">
                <p className="w-1/6">판매가</p>
                <p className="line-through w-5/6 text-[#333] font-normal">
                  {attach_won(item.price)}
                </p>
              </div>
              <div className="w-full mb-3 flex items-center">
                <p className="w-1/6">할인판매가</p>
                <p className="w-5/6 text-[#333] font-normal">
                  {attach_won(item.salePrice)}
                </p>
              </div>
              <div className="w-full flex items-center">
                <p className="w-1/6">상품간략설명</p>
                <p className="w-5/6 text-[#333] font-normal leading-16">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="w-full py-[30px] text-[0.875rem] text-[#999] font-semibold pb-[30px] border-b-[1px] border-solid border-[#ccc]">
              <div className="w-full mb-4 flex items-center">
                <p className="w-1/6">색상</p>
                <select
                  ref={colorInputRef}
                  onChange={(e) => handleSelectColor(e)}
                  className="w-5/6 p-3 border-[1px] bg-transparent border-solid border-[#e5e5e5] outline-none"
                >
                  <option disabled selected>
                    - [필수] 옵션을 선택해 주세요 -
                  </option>
                  {item &&
                    item?.option?.color?.map((c) => {
                      return (
                        <option value={c} key={c} className="hover:bg-black">
                          {c}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="flex">
                <p className="w-1/6">사이즈</p>
                <select
                  ref={sizeInputRef}
                  onChange={(e) => handleSelectSize(e, color)}
                  className="w-5/6 p-3 border-[1px] bg-transparent border-solid border-[#e5e5e5] outline-none"
                >
                  <option disabled selected>
                    - [필수] 옵션을 선택해 주세요 -
                  </option>
                  {item &&
                    item?.option?.size?.map((s) => {
                      return (
                        <option value={s} key={s}>
                          {s}
                        </option>
                      );
                    })}
                </select>
              </div>

              <ul className="w-full mt-[30px]">
                {cart &&
                  cart?.map((c) => {
                    return (
                      <li
                        key={c.id}
                        className="w-full p-4 mb-2 box-border bg-[#f6f6f6] flex justify-between items-center text-[0.875rem] text-[#333]"
                      >
                        <div>
                          <p>{c.title}</p>
                          <p className="text-[#888888]">{`- ${c.color} / ${c.size}`}</p>
                        </div>

                        {/* count 증가 감소 버튼 */}
                        <div className="flex items border-[1px] border-solid border-[#cacaca] font-normal">
                          <button
                            onClick={() => {
                              handleMinusCount(c.id);
                            }}
                            className="w-8 h-8 bg-[#cacaca] text-[1.2rem] flex justify-center items-center border-r-[1px] border-solid border-[#cacaca]"
                          >
                            -
                          </button>
                          <p className="w-8 h-8 flex justify-center items-center">
                            {c.count}
                          </p>
                          <button
                            onClick={() => {
                              handlePlusCount(c.id);
                            }}
                            className="w-8 h-8 bg-[#cacaca] text-[1.2rem] flex justify-center items-center border-l-[1px] border-solid border-[#cacaca]"
                          >
                            +
                          </button>
                        </div>

                        {/* salePrice 계산 */}
                        <div className="w-1/5 flex justify-end">
                          <p className="text-[0.9375rem] mr-2">
                            {attach_won(c.price * c.count)}
                          </p>

                          <button
                            onClick={() => deleteCart(c.id)}
                            className="text-[1.4rem] text-[#787878]"
                          >
                            <GoX />
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className="w-full py-[30px] text-[0.875rem] text-[#333] font-semibold flex justify-between items-center">
              <p>총 상품 금액</p>

              <div className="flex items-center text-[0.875rem] text-[#000] font-normal">
                <p className="text-[1.5rem]  font-bold">
                  {attach_won(totalPrice)}
                </p>
                <p className="ml-2">{`(${totalCount}개)`}</p>
              </div>
            </div>

            <div className="flex justify-between items-center font-semibold">
              <button
                onClick={handlePushCarts}
                className="w-[32%] py-5 border-[1px] border-solid border-black"
              >
                장바구니
              </button>
              <button className="w-[32%] py-5 bg-[#333] text-white">
                구매하기
              </button>
              <button className="w-[32%] py-5 bg-black flex justify-center items-center text-white">
                <p className="text-[1.6rem] text-[#ff5151]">
                  <CiGift />
                </p>
                <p className="ml-1">선물하기</p>
              </button>
            </div>

            {/* kakao event banner */}
            <div className="w-full pt-[30px]">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/../image/banner/kakaoEventBanner.png"
                }
                alt="kakao_event_banner"
              />
            </div>
          </div>
        </div>

        <div className="w-full pt-10">
          <div>
            <h1 className="mb-6 text-[1.5rem] text-[#333] font-semibold">
              특별한 회원 혜택
            </h1>

            <ul className="w-full flex justify-between items-center text-[0.8125rem] text-[#999]">
              <li className="cursor-pointer w-1/6 py-1 border-r-[1px] border-solid border-[#ccc] flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <RiCoupon3Fill />
                </div>
                <p className="mb-2 text-[0.9375rem] text-[#333] font-semibold">
                  신규회원 할인혜택
                </p>
                <p>회원가입 시 신규가입 축하</p>
                <p>
                  <span className="text-[#f57778]">20,000원 쿠폰팩</span> 즉시
                  지급
                </p>
              </li>

              <li className="cursor-pointer w-1/6 py-1 border-r-[1px] border-solid border-[#ccc] flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <GiCutDiamond />
                </div>
                <p className="mb-2 text-[0.9375rem] text-[#333] font-semibold">
                  등급별 추가할인
                </p>
                <p>
                  <span className="text-[#f57778]">회원 할인 + 구매 적립</span>
                </p>
                <p>
                  <span className="text-[#f57778]">
                    + 무료배송 + 사이즈 무료 교환
                  </span>
                </p>
              </li>

              <li className="cursor-pointer w-1/6 py-1 border-r-[1px] border-solid border-[#ccc] flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <HiGift />
                </div>
                <p className="mb-2 text-[0.9375rem] text-[#333] font-semibold">
                  생일 쿠폰 지급
                </p>
                <p>즐거운 날을 위해</p>
                <p>
                  <span className="text-[#f57778]">
                    365일 사용 가능한 할인쿠폰
                  </span>{" "}
                  지급
                </p>
              </li>

              <li className="cursor-pointer w-1/6 py-1 border-r-[1px] border-solid border-[#ccc] flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <CiDeliveryTruck />
                </div>
                <p className="text-[0.9375rem] text-[#333] font-semibold">
                  5만원이상 무료배송
                </p>
                <p>Birthday Party 전상품</p>
                <p>
                  <span className="text-[#f57778]">
                    5만원이상 결제시 무료배송
                  </span>
                </p>
              </li>

              <li className="cursor-pointer w-1/6 py-1 border-r-[1px] border-solid border-[#ccc] flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <CiEdit />
                </div>
                <p className="mb-2 text-[0.9375rem] text-[#333] font-semibold">
                  리뷰 작성시 적립금
                </p>
                <p>유형에 따라 적립금</p>
                <p>
                  <span className="text-[#f57778]">500원 ~ 1500원 차등</span>{" "}
                  지급
                </p>
              </li>

              <li className="cursor-pointer w-1/6 py-1 flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <MdFiberNew />
                </div>
                <p className="mb-2 text-[0.9375rem] text-[#333] font-semibold">
                  신상 5% 할인
                </p>
                <p>매일 매일 UP되는 신상</p>
                <p>
                  <span className="text-[#f57778]">5% 할인가</span>에 득템
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* detail banner */}
        <div className="w-full py-32">
          <img
            className="w-full object-cover cursor-pointer"
            src={process.env.PUBLIC_URL + "/../image/banner/detailBanner1.png"}
            alt="detail_banner"
          />
          <img
            className="w-full object-cover mt-6 cursor-pointer"
            src={process.env.PUBLIC_URL + "/../image/banner/detailBanner2.png"}
            alt="detail_banner"
          />
        </div>

        {/* detail page tab */}
        <div className="w-full">
          <div className="w-full flex">
            {category &&
              category?.map((c) => {
                return (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCat(c);
                    }}
                    className={`${
                      c === cat ? "bg-opacity-100" : "bg-opacity-0"
                    } w-1/4 py-5 border-[1px] bg-[#282828] border-solid border-[#ccc] border-b-[#333] rounded-t-lg transition-all duration-700`}
                  >
                    <p
                      className={`${
                        c === cat ? "text-white" : "text-[#333]"
                      } text-[0.9375rem] font-semibold`}
                    >
                      {c}
                    </p>
                  </button>
                );
              })}
          </div>

          {cat === "상품정보" && <DetailInfo detailImg={item.detailImg} />}
          {cat === "사용후기" && (
            <DetailReview
              user={user}
              item={item}
              firestoreReviewData={firestoreReviewData}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              openReviewDetailModal={openReviewDetailModal}
              handleClickBenefitBtn={handleClickBenefitBtn}
              handleDeleteReview={handleDeleteReview}
              handleEditReview={handleEditReview}
              handleEditReviewSuccess={handleEditReviewSuccess}
              reviewEdit={reviewEdit}
              setChangeText={setChangeText}
              changeText={changeText}
              openMyBodySizeModal={openMyBodySizeModal}
              myBodyInfo={myBodyInfo}
            />
          )}
          {cat === "교환 및 반품" && <DetailCS />}
          {cat === "상품문의" && <DetailQuestion user={user} item={item} />}
        </div>
      </div>

      {modalOpen && (
        <Modal user={user} onClose={closeModal}>
          <div className="w-full flex justify-between">
            <div className="w-[28%] p-5 box-border border-r-[1px] border-solid border-[#e8e8e8]">
              <img
                className="w-full h-[10.875rem] object-fill rounded-lg"
                src={process.env.PUBLIC_URL + `/../${item.image}`}
                alt="item_img"
              />
              <p className="mt-4 text-[#030303] text-[0.9375rem] font-semibold">
                {shortString(item.title, 10)}
              </p>
            </div>
            <div className="w-[72%] p-5 box-border">
              <div>
                <div className="w-full flex flex-wrap">
                  {!user && (
                    <>
                      <div className="w-1/2 p-3 border-y-[1px] border-l-[1px] border-solid border-[#c1c1c1] rounded-l-lg flex items-center">
                        <label className="w-[30%]" htmlFor="phoneNumber">
                          전화번호
                        </label>
                        <input
                          id="phoneNumber"
                          className="w-[60%] ml-3 outline-none"
                          type="text"
                          onChange={(e) => checkPhonenumber(e)}
                          value={phoneNumber}
                          maxlength="11"
                          placeholder="전화번호를 입력하세요."
                          pattern="[0-9]+"
                        />
                      </div>

                      <div className="w-1/2 p-3 border-[1px] border-solid border-[#c1c1c1] rounded-r-lg flex items-center">
                        <label className="w-[30%]" htmlFor="password">
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
                    </>
                  )}
                  {item?.option?.size && (
                    <select
                      ref={colorInputRef2}
                      onChange={(e) => handleSelectColor2(e)}
                      className="text-center text-[#ff4273] w-1/2 p-3 mt-2 border-y-[1px] border-l-[1px] bg-transparent border-solid border-[#ff4273] outline-none rounded-l-lg placeholder:text-[]"
                    >
                      <option disabled selected>
                        옵션 색상 선택
                      </option>
                      {item &&
                        item?.option?.color?.map((c) => {
                          return (
                            <option value={c} key={c}>
                              {c}
                            </option>
                          );
                        })}
                    </select>
                  )}

                  {item?.option?.size && (
                    <select
                      ref={sizeInputRef2}
                      onChange={(e) => handleSelectsize2(e)}
                      className="w-1/2 p-3 mt-2 border-[1px] bg-transparent border-solid border-[#ff4273] outline-none rounded-r-lg text-[#ff4273] text-center"
                    >
                      <option disabled selected>
                        옵션 사이즈 선택
                      </option>
                      {item &&
                        item?.option?.size?.map((s) => {
                          return (
                            <option value={s} key={s}>
                              {s}
                            </option>
                          );
                        })}
                    </select>
                  )}

                  <div className="w-1/2 mt-2 p-3 box-border border-y-[1px] border-l-[1px] border-solid border-[#c1c1c1] rounded-l-lg flex items-center">
                    <label className="w-[30%]" htmlFor="height">
                      키
                    </label>
                    <input
                      className="w-[20%] ml-3 outline-none text-right"
                      id="height"
                      type="text"
                      value={reviewHeight}
                      onChange={(e) => setReviewHeight(e.target.value)}
                      placeholder="0"
                    />
                    <p>cm</p>
                  </div>

                  <div className="w-1/2 mt-2 p-3 box-border border-[1px] border-solid border-[#c1c1c1] rounded-r-lg flex items-center">
                    <label className="w-[30%]" htmlFor="weight">
                      몸무게
                    </label>
                    <input
                      className="w-[20%] ml-3 outline-none text-right"
                      id="weight"
                      type="text"
                      value={reviewWeight}
                      onChange={(e) => setReviewWeight(e.target.value)}
                      placeholder="0"
                    />
                    <p>kg</p>
                  </div>

                  <div className="w-1/2 mt-2 p-3 box-border border-y-[1px] border-l-[1px] border-solid border-[#c1c1c1] rounded-l-lg flex items-center">
                    <label className="w-[30%]" htmlFor="bodySize">
                      사이즈
                    </label>
                    <input
                      className="w-[20%] ml-3 outline-none text-right"
                      id="bodySize"
                      type="text"
                      value={reviewBodySize}
                      onChange={(e) => setReviewBodySize(e.target.value)}
                      placeholder="00"
                    />
                    <p>size</p>
                  </div>

                  <div className="w-1/2 mt-2 p-3 box-border border-[1px] border-solid border-[#c1c1c1] rounded-r-lg flex items-center">
                    <label className="w-[30%]" htmlFor="foot">
                      발사이즈
                    </label>
                    <input
                      className="w-[20%] ml-3 outline-none text-right"
                      id="foot"
                      type="text"
                      value={reviewBodyFoot}
                      onChange={(e) => setReviewBodyFoot(e.target.value)}
                      placeholder="0"
                    />
                    <p>mm</p>
                  </div>
                </div>
              </div>

              <div className="w-full mt-6 text-center flex flex-col items-center">
                <h1 className="mb-2">상품은 만족하셨나요?</h1>
                <div className="flex items-center">
                  <BasicRating
                    ratingValue={ratingValue}
                    setRatingValue={setRatingValue}
                  />
                  <h1 className="ml-2 text-[1.4em]">{ratingValue}</h1>
                </div>
              </div>

              <div className="w-full mt-3 text-center flex flex-col items-center">
                <h1 className="mb-4">색상은 어떠셨나요?</h1>

                <div className="w-full flex justify-between items-center">
                  <input
                    className={`${
                      reviewColorSatisfaction === "연해요"
                        ? "border-[#ff4273] text-[#ff4273]"
                        : "border-[#c1c1c1] text-[#a1a1a1]"
                    } w-[31%] py-2 border-[1px] border-solid rounded-full cursor-pointer transition-all duration-700`}
                    type="button"
                    value="연해요"
                    onClick={(e) => setReviewColorSatisfaction(e.target.value)}
                  />
                  <input
                    className={`${
                      reviewColorSatisfaction === "똑같아요"
                        ? "border-[#ff4273] text-[#ff4273]"
                        : "border-[#c1c1c1] text-[#a1a1a1]"
                    } w-[31%] py-2 border-[1px] border-solid rounded-full cursor-pointer transition-all duration-700`}
                    type="button"
                    value="똑같아요"
                    onClick={(e) => setReviewColorSatisfaction(e.target.value)}
                  />
                  <input
                    className={`${
                      reviewColorSatisfaction === "진해요"
                        ? "border-[#ff4273] text-[#ff4273]"
                        : "border-[#c1c1c1] text-[#a1a1a1]"
                    } w-[31%] py-2 border-[1px] border-solid rounded-full cursor-pointer transition-all duration-700`}
                    type="button"
                    value="진해요"
                    onClick={(e) => setReviewColorSatisfaction(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full mt-6 text-center flex flex-col items-center">
                <h1 className="mb-4">사이즈는 잘 맞으셨나요?</h1>

                <div className="w-full flex justify-between items-center">
                  <input
                    className={`${
                      reviewSizeSatisfaction === "작아요"
                        ? "border-[#ff4273] text-[#ff4273]"
                        : "border-[#c1c1c1] text-[#a1a1a1]"
                    } w-[31%] py-2 border-[1px] border-solid rounded-full cursor-pointer transition-all duration-700`}
                    type="button"
                    value="작아요"
                    onClick={(e) => setReviewSizeSatisfaction(e.target.value)}
                  />
                  <input
                    className={`${
                      reviewSizeSatisfaction === "잘맞아요"
                        ? "border-[#ff4273] text-[#ff4273]"
                        : "border-[#c1c1c1] text-[#a1a1a1]"
                    } w-[31%] py-2 border-[1px] border-solid rounded-full cursor-pointer transition-all duration-700`}
                    type="button"
                    value="잘맞아요"
                    onClick={(e) => setReviewSizeSatisfaction(e.target.value)}
                  />
                  <input
                    className={`${
                      reviewSizeSatisfaction === "커요"
                        ? "border-[#ff4273] text-[#ff4273]"
                        : "border-[#c1c1c1] text-[#a1a1a1]"
                    } w-[31%] py-2 border-[1px] border-solid rounded-full cursor-pointer transition-all duration-700`}
                    type="button"
                    value="커요"
                    onClick={(e) => setReviewSizeSatisfaction(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full mt-6 text-center flex flex-col items-center">
                <h1 className="mb-4">핏이나 만족감은 어떠세요?</h1>

                <div className="w-full relative">
                  <textarea
                    className="w-full p-4 box-border border-[1px] border-solid border-[#c1c1c1] rounded-lg resize-none outline-none placeholder:text-[0.8rem] font-light"
                    value={content}
                    onChange={handleContentChange}
                    rows={3}
                    cols={50}
                    minLength={10}
                    placeholder="최소 10자 이상 입력해주세요."
                  />
                  <div className="text-[0.75rem] text-[#999] absolute bottom-4 right-4">
                    {remainingBytes >= 0
                      ? `${content.length} Byte / ${maxBytes} Byte`
                      : `Exceeded ${Math.abs(remainingBytes)} Bytes`}
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <Button
                  onClick={(e) => handleStoreReviewData(e)}
                  value="리뷰 쓰기"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {reviewDetailModalOpen && (
        <DetailReviewModal onClose={closeReviewDetailModal}>
          {selectedReviewId &&
            firestoreReviewData
              .filter((review) => review.id === selectedReviewId)
              .map((review) => {
                return (
                  <div className="w-full px-4 pb-4 flex">
                    <div className="w-1/2">
                      <img
                        className="w-full object-cover rounded-lg"
                        src={process.env.PUBLIC_URL + `/../${review.image}`}
                        alt="detail_review_img"
                      />
                    </div>

                    <div className="w-1/2 px-5 box-border">
                      <div className="w-full pb-4 pl-5 box-border flex items-center border-b-[1px] shadow-lg">
                        <img
                          className="w-[65px] h-[65px] object-cover rounded-lg"
                          src={process.env.PUBLIC_URL + `/../${review.image}`}
                          alt="detail_review_img"
                        />
                        <div className="ml-4">
                          <div className="flex items-center">
                            <RatingResult2 ratingValue={review.ratingValue} />
                            <p className="ml-1 mt-[-5px]">
                              {review.ratingValue}
                            </p>
                          </div>

                          <p className="text-[0.75rem] text-[#888]">
                            {!review.phoneNumber
                              ? review.profileDisplayName
                              : review.phoneNumber.slice(0, 7) + "***"}
                          </p>
                        </div>
                      </div>

                      <div className="w-full py-5 text-[0.8125rem]">
                        <div className="w-full p-3 box-border text-[#898989] border-[1px] border-dotted border-[#dcdcdc] rounded-lg">
                          <p className="mb-2">{`선택한 옵션 : ${review.reviewColor} / ${review.reviewSize}`}</p>
                          <p className="mb-2">{`키 : ${review.reviewHeight}cm | 몸무게 : ${review.reviewWeight}kg | 평소 사이즈 : ${review.reviewBodySize}size | 발사이즈 : ${review.reviewBodyFoot}mm`}</p>
                          <p className="text-[#ff827e]">{`색상 : ${review.reviewColorSatisfaction} | 사이즈 : ${review.reviewSizeSatisfaction}`}</p>
                        </div>

                        {reviewEdit.id !== review.id && (
                          <p className="mt-3 text-[0.75rem] text-[#222]">
                            {review.content}
                          </p>
                        )}

                        {reviewEdit.id === review.id && (
                          <form
                            className="flex"
                            onSubmit={(e) =>
                              handleEditReviewSuccess(e, review.detailUserId)
                            }
                          >
                            <input
                              defaultValue={changeText}
                              onChange={(e) => {
                                e.preventDefault();
                                setChangeText(e.target.value);
                              }}
                              className="w-3/4 mt-5 p-2 box-border border-[1px] border-solid border-[#afafaf] rounded-lg outline-none text-[0.875rem] placeholder:text-[0.875rem]"
                              type="text"
                              placeholder="수정할 내용을 입력하세요."
                            />
                            <button
                              type="submit"
                              className="w-[120px] ml-2 mt-5  bg-[#282828] text-white rounded-lg"
                            >
                              수정 완료
                            </button>
                          </form>
                        )}

                        <div className="mt-10 flex justify-between items-center">
                          <p className="text-[0.8125rem] text-[#8D8B8B]">
                            <span className="text-[0.875rem] text-[#000] font-semibold">{`${review.count}명`}</span>
                            에게 도움이 되었습니다.
                          </p>

                          <button
                            onClick={(e) => handleClickBenefitBtn(e, review.id)}
                            className="w-[100px] h-[30px] ml-2 border-[1px] border-solid border-[#ff4273] text-[0.8125rem] rounded-lg text-[#ff4273] flex justify-center items-center"
                          >
                            도움이 돼요
                          </button>
                        </div>

                        <div className="mt-14 flex items-center">
                          {user && user.uid === review.userId && (
                            <>
                              {reviewEdit.id !== review.id && (
                                <button
                                  onClick={(e) =>
                                    handleEditReview(
                                      e,
                                      review.password,
                                      review.id
                                    )
                                  }
                                  className={`${
                                    reviewEdit.id == review.id
                                      ? "mr-none"
                                      : "mr-2"
                                  } w-[120px] h-[40px] bg-[#000000] text-white border-[1px] border-solid border-[#000000] text-[0.8125rem] rounded-lg hover:text-[#000000] hover:bg-opacity-0 transition-all duration-700 flex justify-center items-center`}
                                >
                                  수정하기
                                </button>
                              )}

                              <button
                                onClick={(e) =>
                                  handleDeleteReview(
                                    e,
                                    review?.password,
                                    review?.detailUserId
                                  )
                                }
                                className="w-[120px] h-[40px] bg-[#000000] text-white border-[1px] border-solid border-[#000000] text-[0.8125rem] rounded-lg hover:text-[#000000] hover:bg-opacity-0 transition-all duration-700 flex justify-center items-center"
                              >
                                삭제하기
                              </button>
                            </>
                          )}

                          {user === null && (
                            <>
                              {reviewEdit.id !== review.id && (
                                <button
                                  onClick={(e) =>
                                    handleEditReview(
                                      e,
                                      review.password,
                                      review.id
                                    )
                                  }
                                  className="w-[120px] h-[40px] bg-[#000000] text-white border-[1px] border-solid border-[#000000] text-[0.8125rem] rounded-lg hover:text-[#000000] hover:bg-opacity-0 transition-all duration-700 flex justify-center items-center"
                                >
                                  수정하기
                                </button>
                              )}

                              <button
                                onClick={(e) =>
                                  handleDeleteReview(
                                    e,
                                    review?.password,
                                    review?.detailUserId
                                  )
                                }
                                className={`${
                                  reviewEdit.id === review.id
                                    ? "ml-none"
                                    : "ml-2"
                                } w-[120px] h-[40px]  bg-[#000000] text-white border-[1px] border-solid border-[#000000] text-[0.8125rem] rounded-lg hover:text-[#000000] hover:bg-opacity-0 transition-all duration-700 flex justify-center items-center`}
                              >
                                삭제하기
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </DetailReviewModal>
      )}

      {myBodySizeModalOpen && (
        <MyBodySizeModal onClose={closeMyBodySizeModal}>
          <div className="w-full px-4 box-border">
            <div className="text-center mt-[15px] mb-[25px] pb-[25px] border-b-[2px] border-solid border-[#282828]">
              <h1 className="text-[1.25rem] font-semibold">
                나의 체형 정보 입력
              </h1>
            </div>

            <div className="py-3 px-2 box-border">
              <div className="w-full mb-3 py-4 px-5 box-border border-[1px] border-solid border-[#c1c1c1] rounded-lg flex items-center">
                <label
                  className="w-[30%] border-r-[1px] border-solid border-[#282828] text-[0.875rem]"
                  htmlFor="myHeight"
                >
                  키
                </label>
                <input
                  className="w-[70%] outline-none text-center"
                  onChange={(e) => {
                    setMyHeight(e.target.value);
                  }}
                  value={myHeight}
                  id="myHeight"
                  type="text"
                  placeholder={`${myBodyInfo ? myBodyInfo.myHeight : "0"}`}
                />
              </div>

              <div className="w-full mb-3 py-4 px-5 box-border border-[1px] border-solid border-[#c1c1c1] rounded-lg flex items-center">
                <label
                  className="w-[30%] border-r-[1px] border-solid border-[#282828] text-[0.875rem]"
                  htmlFor="myWeight"
                >
                  몸무게
                </label>
                <input
                  className="w-[70%] outline-none text-center"
                  onChange={(e) => {
                    setMyWeight(e.target.value);
                  }}
                  value={myWeight}
                  id="myWeight"
                  type="text"
                  placeholder={`${myBodyInfo ? myBodyInfo.myWeight : "0"}`}
                />
              </div>

              <div className="w-full mb-3 py-4 px-5 box-border border-[1px] border-solid border-[#c1c1c1] rounded-lg flex items-center">
                <label
                  className="w-[30%] border-r-[1px] border-solid border-[#282828] text-[0.875rem]"
                  htmlFor="mySize"
                >
                  사이즈
                </label>
                <input
                  className="w-[70%] outline-none text-center"
                  onChange={(e) => {
                    setMySize(e.target.value);
                  }}
                  value={mySize}
                  id="mySize"
                  type="text"
                  placeholder={`${myBodyInfo ? myBodyInfo.mySize : "0"}`}
                />
              </div>

              <div className="w-full py-4 px-5 box-border border-[1px] border-solid border-[#c1c1c1] rounded-lg flex items-center">
                <label
                  className="w-[30%] border-r-[1px] border-solid border-[#282828] text-[0.875rem]"
                  htmlFor="myFoot"
                >
                  발사이즈
                </label>
                <input
                  className="w-[70%] outline-none text-center"
                  onChange={(e) => {
                    setMyFootSize(e.target.value);
                  }}
                  value={myFootSize}
                  id="myFoot"
                  type="text"
                  placeholder={`${myBodyInfo ? myBodyInfo.myFootSize : "0"}`}
                />
              </div>

              <div className="w-full mb-3 flex justify-center">
                <Button
                  onClick={(e) => handleStoreBodySizeInfo(e)}
                  value="등록"
                />
              </div>
            </div>
          </div>
        </MyBodySizeModal>
      )}
    </div>
  );
}

export const salePercent = (price, salePrice) => {
  const percent = parseInt(price / (price - salePrice));
  return percent + "%";
};
