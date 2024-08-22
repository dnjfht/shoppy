import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { attach_won, salePercent } from "../constants/constants";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DetailInfo from "../components/Detail/DetailInfo";
import DetailQuestion from "../components/Detail/question/DetailQuestion";
import DetailReview from "../components/Detail/review/DetailReview";
import DetailCS from "../components/Detail/detailCS/DetailCS";
import Modal from "../components/Detail/review/Modal";
import BasicRating from "../components/Detail/review/BasicRating";
import Button from "../components/button/Button";
import DetailReviewModal from "../components/Detail/review/DetailReviewModal";
import MyBodySizeModal from "../components/Detail/review/MyBodySizeModal";
import { loadCartServer, setCartServer } from "../api/cart";
import { recieveReviewData, setReviewServer } from "../api/review";
import { recieveBodyData, setMyBodyServer } from "../api/body";
import { isLoggedIn } from "../utils/utils";

import { GoX } from "react-icons/go";
import { CiHeart, CiGift, CiDeliveryTruck, CiEdit } from "react-icons/ci";
import { PiShareNetworkThin } from "react-icons/pi";
import { RiCoupon3Fill } from "react-icons/ri";
import { GiCutDiamond } from "react-icons/gi";
import { HiGift } from "react-icons/hi";
import { MdFiberNew } from "react-icons/md";

export default function Detail({ user, setAllCarts, setNonMemberAllCarts }) {
  const navigate = useNavigate();

  const {
    state: { item },
  } = useLocation();

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

  const deleteCart = (idx) => {
    setCart((prevCart) => prevCart.filter((c) => c.id !== idx));
  };

  const handlePushCarts = async () => {
    if (user) {
      const prevCart = (await loadCartServer(user)) ?? [];
      await setCartServer(user, [...prevCart, ...cart]);
      setAllCarts([...prevCart, ...cart]);
      setCart([]);
    } else if (!isLoggedIn()) {
      setCart([]);

      const previousCart = JSON.parse(localStorage.getItem("carts")) || [];
      localStorage.setItem("carts", JSON.stringify([...previousCart, ...cart]));
      setNonMemberAllCarts([...previousCart, ...cart]);
    }
  };

  const category = ["상품정보", "사용후기", "교환 및 반품", "상품문의"];

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
    () => recieveReviewData(item?.id)
  );

  // 리뷰 등록하기.
  const createReview = async (reviewData) => {
    try {
      const res = await setReviewServer(
        user,
        phoneNumber,
        item,
        firestoreReviewData,
        reviewData
      );
      return res.config.data["data"];
    } catch (error) {
      throw error;
    }
  };

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
          count: [],
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
          count: [],
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

  // 리뷰 "도움이 돼요" 버튼 클릭 기능
  const editCountReview = async ({ detailUserId, reviewData }) => {
    try {
      const res = await axios.post(
        `https://birthday-party-shop-backend-server.vercel.app/review/${item.id}/${detailUserId}`,
        reviewData
      );
      console.log(res.config.data["data"]);
      return res.config.data["data"];
    } catch (error) {
      throw error;
    }
  };

  const editReviewCountMutation = useMutation(
    ({ detailUserId, reviewData }) =>
      editCountReview({ detailUserId, reviewData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["firestoreReviewData", item?.id]);
        console.log(firestoreReviewData);
      },
    }
  );

  async function handleClickBenefitBtn(e, detailUserId) {
    e.preventDefault();

    // detailUserId로 된 게시물 찾기
    const findDetailUserIdReview = firestoreReviewData.find((review) =>
      review.detailUserId.includes(detailUserId)
    );

    if (user) {
      const reviewData = {
        data: {
          ...findDetailUserIdReview,
          count:
            // detailUserId로 된 게시물(객체) 안 count라는 배열 안 userId에 현재 user.uid가 포함되어 있는 객체가 없을 때.
            findDetailUserIdReview.count.filter((c) =>
              c.userId.includes(user.uid)
            ).length === 0
              ? // 0이 맞다면 count라는 배열 안, 새롭게 현재 user.uid가 들어간 userId와 count 1을 넣어 객체 생성.
                [
                  ...findDetailUserIdReview.count,
                  { userId: user.uid, count: 1 },
                ]
              : // detailUserId로 된 게시물(객체) 안 count라는 배열 안 userId에 현재 user.uid가 포함되어 있는 객체가 있을 때.
                findDetailUserIdReview.count.map((review) => {
                  if (review.count === 1 && review.userId.includes(user.uid)) {
                    return {
                      ...review,
                      count: 0,
                    };
                  } else if (
                    review.count === 0 &&
                    review.userId.includes(user.uid)
                  ) {
                    return {
                      ...review,
                      count: 1,
                    };
                  }
                  return review;
                }),
        },
      };

      editReviewCountMutation.mutate({ detailUserId, reviewData });
    } else if (user === null) {
      alert("비회원은 좋아요를 누를 수 없습니다. 로그인을 해주세요.");
    }
  }

  const deleteReview = async ({ detailUserId, reviewData }) => {
    try {
      const res = await axios.post(
        `https://birthday-party-shop-backend-server.vercel.app/review/${item?.id}/${detailUserId}`,
        reviewData
      );
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
    } else {
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
        `https://birthday-party-shop-backend-server.vercel.app/review/${item?.id}/${detailUserId}`,
        editReviewData
      );
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

    // 리뷰 수정
    editReviewMutation.mutate({ detailUserId, editReviewData });

    setReviewEdit((prev) => ({ ...prev, id: "", isActive: false }));
  }

  // 체형 정보 가져오기.
  const { data: bodyData } = useQuery(
    ["firestoreBodyData", user?.uid],
    async () => {
      const res = await recieveBodyData(user?.uid);
      return res.data;
    },
    {
      enabled: !!user?.uid,
    }
  );

  // 내 체형 등록하기.
  async function handleStoreBodySizeInfo(e) {
    e.preventDefault();

    setMyBodyInfo((prev) => ({
      myHeight: myHeight !== "" ? myHeight : prev.myHeight,
      myWeight: myWeight !== "" ? myWeight : prev.myWeight,
      mySize: mySize !== "" ? mySize : prev.mySize,
      myFootSize: myFootSize !== "" ? myFootSize : prev.myFootSize,
    }));

    if (user) {
      if (bodyData === null) {
        await setMyBodyServer(
          myHeight,
          myWeight,
          mySize,
          myFootSize,
          user?.uid
        );
      } else {
        const updatedBodyInfo = {
          myHeight: myHeight || bodyData.myHeight,
          myWeight: myWeight || bodyData.myWeight,
          mySize: mySize || bodyData.mySize,
          myFootSize: myFootSize || bodyData.myFootSize,
        };

        await setMyBodyServer(
          updatedBodyInfo.myHeight,
          updatedBodyInfo.myWeight,
          updatedBodyInfo.mySize,
          updatedBodyInfo.myFootSize,
          user?.uid
        );
      }
    } else if (user === null) {
      const previousBodyInfo = JSON.parse(localStorage.getItem("bodyInfo"));

      const mergedBodyInfo = {
        ...previousBodyInfo,
        ...{ myHeight, myWeight, mySize, myFootSize },
      };
      localStorage.setItem("bodyInfo", JSON.stringify(mergedBodyInfo));
    }
    setMyBodySizeModalOpen(false);
  }

  useEffect(() => {
    if (user === null) {
      const bodyInfo = JSON.parse(localStorage.getItem("bodyInfo"));
      setMyBodyInfo(bodyInfo);
    }
  }, [user, setMyBodyInfo]);

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
      <div className="w-full max-w-[90%] mx-auto lg:pt-52 md:pt-44 sm:pt-40 3sm:pt-32 md:pb-20 sm:pb-14 3sm:pb-8 flex flex-col justify-between">
        {/* Top 구간 */}
        <div className="w-full md:pb-32 sm:pb-24 3sm:pb-10 border-b-[1px] border-bottom border-[#ccc] lg:flex justify-between">
          <div className="lg:w-[47%] 3sm:w-full">
            <img
              className="object-cover w-full"
              src={process.env.PUBLIC_URL + `/../${item.image}`}
              alt="item_img"
            />
          </div>

          <div className="lg:w-[47%] 3sm:w-full lg:mt-0 3sm:mt-6">
            <div className="w-full md:pb-8 sm:pb-6 3sm:pb-4 border-b-[1px] border-solid border-[#ccc]">
              <div className="flex items-center justify-between w-full">
                <div className="flex w-4/5">
                  {item?.banner?.map((b) => {
                    return (
                      <p
                        className={`${
                          b === "new"
                            ? "border-[deeppink] text-[deeppink]"
                            : "border-[#30d0b3] text-[#30d0b3]"
                        } md:w-20 3sm:w-14 md:py-1 3sm:py-[2px] mr-2 border-[1px] border-solid md:text-[0.8rem] 3sm:text-[0.75rem] flex justify-center items-center`}
                      >
                        {b}
                      </p>
                    );
                  })}
                </div>

                <div className="w-1/5 md:text-[1.8rem] sm:text-[1.5rem] 3sm:text-[1.3rem] flex justify-end">
                  <button>
                    <CiHeart />
                  </button>

                  <button className="ml-3">
                    <PiShareNetworkThin />
                  </button>
                </div>
              </div>

              <h1 className="md:text-[1.5rem] 3sm:text-[1.2rem] text-[#282828] font-semibold mt-2">
                {item.title}
              </h1>

              <div className="mt-1 text-[#f98888] md:text-[1.5rem] sm:text-[1.2rem] 3sm:text-[1.1rem] font-semibold flex items-baseline">
                <h1>{salePercent(item.price, item.salePrice)}</h1>
                <h1 className="ml-2">{attach_won(item.salePrice)}</h1>
                <h1 className="ml-1 md:text-[1.125rem] sm:text-[1rem] 3sm:text-[0.9rem] text-[#aaa] font-normal line-through">
                  {attach_won(item.price)}
                </h1>
              </div>
            </div>

            <div className="w-full md:py-8 sm:py-6 3sm:py-4 md:text-[0.875rem] 3sm:text-[0.75rem] text-[#999] font-semibold pb-[30px] border-b-[1px] border-solid border-[#ccc]">
              <div className="flex items-center w-full mb-3 gap-x-2">
                <p className="w-1/6">판매가</p>
                <p className="line-through w-5/6 text-[#333] font-normal">
                  {attach_won(item.price)}
                </p>
              </div>
              <div className="flex items-center w-full mb-3 gap-x-2">
                <p className="w-1/6">할인판매가</p>
                <p className="w-5/6 text-[#333] font-normal">
                  {attach_won(item.salePrice)}
                </p>
              </div>
              <div className="flex items-center w-full gap-x-2">
                <p className="w-1/6">상품간략설명</p>
                <p className="w-5/6 text-[#333] font-normal leading-16">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="w-full md:py-8 sm:py-6 3sm:py-4 md:text-[0.875rem] 3sm:text-[0.75rem] text-[#999] font-semibold pb-[30px] border-b-[1px] border-solid border-[#ccc]">
              <div className="flex items-center w-full mb-4">
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

              <div className="flex items-center">
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

              <ul
                className={`${
                  cart?.length > 0 ? "block" : "hidden"
                } w-full md:mt-8 sm:mt-6 3sm:mt-4`}
              >
                {cart?.map((c) => {
                  return (
                    <li
                      key={c.id}
                      className={`${
                        cart?.length > 1 ? "mb-2" : "mb-0"
                      } w-full p-4 box-border bg-[#f6f6f6] grid grid-cols-3 gap-x-3 md:text-[0.875rem] 3sm:text-[0.75rem] text-[#333]`}
                    >
                      <div className="flex flex-col justify-center w-full">
                        <p>{c.title}</p>
                        <p className="text-[#888888]">{`- ${c.color} / ${c.size}`}</p>
                      </div>

                      {/* count 증가 감소 버튼 */}
                      <div className=":w-full font-normal md:text-[1.2rem] sm:text-[1rem] 3sm:text-[0.9rem] flex justify-center items-center">
                        <div className="flex items-center justify-center 2sm:w-1/2 3sm:w-full border-[1px] border-solid border-[#cacaca]">
                          <button
                            onClick={() => {
                              handleMinusCount(c.id);
                            }}
                            className="w-1/3 aspect-square bg-[#cacaca] flex justify-center items-center"
                          >
                            -
                          </button>
                          <p className="flex items-center justify-center w-1/3 aspect-square">
                            {c.count}
                          </p>
                          <button
                            onClick={() => {
                              handlePlusCount(c.id);
                            }}
                            className="w-1/3 aspect-square bg-[#cacaca] flex justify-center items-center"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* salePrice 계산 */}
                      <div className="flex items-center justify-end w-full">
                        <p className="md:mr-2 3sm:mr-1">
                          {attach_won(c.price * c.count)}
                        </p>

                        <Button
                          icon={<GoX />}
                          onClick={() => deleteCart(c.id)}
                          styles="md:text-[1.6rem] sm:text-[1.4rem] 3sm:text-[1.3rem] text-[#787878]"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="w-full md:py-8 sm:py-6 3sm:py-4 md:text-[0.875rem] 3sm:text-[0.75rem] text-[#333] font-semibold flex justify-between items-center">
              <p>총 상품 금액</p>

              <div className="flex items-center text-[#000] font-normal">
                <p className="md:text-[1.5rem] sm:text-[1.2rem] 3sm:text-[1.1rem] font-bold">
                  {attach_won(totalPrice)}
                </p>
                <p className="ml-2">{`(${totalCount}개)`}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 font-semibold gap-x-2 md:text-[1rem] 3sm:text-[0.875rem]">
              <button
                onClick={() => {
                  handlePushCarts();
                  navigate("/carts");
                }}
                className="w-full md:py-5 3sm:py-3 border-[1px] border-solid border-black"
              >
                장바구니
              </button>
              <button className="w-full md:py-5 3sm:py-3 bg-[#333] text-white">
                구매하기
              </button>
              <button className="flex items-center justify-center w-full text-white bg-black md:py-5 3sm:py-3">
                <p className="md:text-[1.6rem] sm:text-[1.3rem] 3sm:text-[1.1rem] text-[#ff5151]">
                  <CiGift />
                </p>
                <p className="ml-1">선물하기</p>
              </button>
            </div>

            <div className="w-full md:pt-8 sm:pt-6 3sm:pt-4">
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

        {/* Bottom 구간 */}
        <div className="w-full">
          <div className="w-full md:pt-10 sm:pt-8 3sm:pt-6">
            <h1 className="md:mb-6 sm:mb-4 3sm:mb-2 md:text-[1.5rem] sm:text-[1.2rem] 3sm:text-[1.1rem] text-[#333] font-semibold 2sm:text-left 3sm:text-center">
              특별한 회원 혜택
            </h1>

            <ul className="w-full flex justify-between items-center flex-wrap md:text-[0.8125rem] 3sm:text-[0.75rem] text-[#999] 2sm:text-center">
              <li className="cursor-pointer lg:w-1/6 md:w-1/3 2sm:w-1/2 3sm:w-full md:py-1 md:px-4 3sm:py-3 box-border 2sm:border-r-[1px] 2sm:border-b-0 3sm:border-b-[1px] border-solid border-[#ccc] flex 2sm:flex-col items-center 2sm:justify-normal 3sm:justify-center 2sm:gap-x-0 3sm:gap-x-4">
                <RiCoupon3Fill className="mb-4 md:text-[3rem] sm:text-[2.4rem] 3sm:text-[2rem] text-[#eb4545]" />

                <div>
                  <p className="mb-2 md:text-[0.9375rem] sm:text-[0.875rem] 3sm:text-[0.8rem] text-[#333] font-semibold">
                    신규회원 할인혜택
                  </p>
                  <p>회원가입 시 신규가입 축하</p>
                  <p>
                    <span className="text-[#f57778]">20,000원 쿠폰팩</span> 즉시
                    지급
                  </p>
                </div>
              </li>

              <li className="cursor-pointer lg:w-1/6 md:w-1/3 2sm:w-1/2 3sm:w-full md:py-1 md:px-4 3sm:py-3 box-border md:border-r-[1px] 2sm:border-b-0 3sm:border-b-[1px] border-solid border-[#ccc] flex 2sm:flex-col items-center 2sm:justify-normal 3sm:justify-center 2sm:gap-x-0 3sm:gap-x-4">
                <GiCutDiamond className="mb-4 md:text-[3rem] sm:text-[2.4rem] 3sm:text-[2rem] text-[#f57778]" />

                <div>
                  <p className="mb-2 md:text-[0.9375rem] sm:text-[0.875rem] 3sm:text-[0.8rem] text-[#333] font-semibold">
                    등급별 추가할인
                  </p>
                  <p>
                    <span className="text-[#f57778]">
                      회원 할인 + 구매 적립
                    </span>
                  </p>
                  <p>
                    <span className="text-[#f57778]">
                      + 무료배송 + 사이즈 무료 교환
                    </span>
                  </p>
                </div>
              </li>

              <li className="cursor-pointer lg:w-1/6 md:w-1/3 2sm:w-1/2 3sm:w-full md:py-1 md:px-4 3sm:py-3 box-border lg:border-r-[1px] md:border-r-0 2sm:border-r-[1px] 2sm:border-b-0 3sm:border-b-[1px] border-solid border-[#ccc] flex 2sm:flex-col items-center 2sm:justify-normal 3sm:justify-center 2sm:gap-x-0 3sm:gap-x-4">
                <HiGift className="mb-4 md:text-[3rem] sm:text-[2.4rem] 3sm:text-[2rem] text-[#f57778]" />

                <div>
                  <p className="mb-2 md:text-[0.9375rem] sm:text-[0.875rem] 3sm:text-[0.8rem] text-[#333] font-semibold">
                    생일 쿠폰 지급
                  </p>
                  <p>즐거운 날을 위해</p>
                  <p>
                    <span className="text-[#f57778]">
                      365일 사용 가능한 할인쿠폰
                    </span>{" "}
                    지급
                  </p>
                </div>
              </li>

              <li className="cursor-pointer lg:w-1/6 md:w-1/3 2sm:w-1/2 3sm:w-full md:py-1 md:px-4 3sm:py-3 box-border md:border-r-[1px] sm:border-r-0 2sm:border-b-0  3sm:border-b-[1px] border-solid border-[#ccc] flex 2sm:flex-col items-center 2sm:justify-normal 3sm:justify-center 2sm:gap-x-0 3sm:gap-x-4">
                <CiDeliveryTruck className="mb-4 md:text-[3rem] sm:text-[2.4rem] 3sm:text-[2rem] text-[#f57778]" />

                <div>
                  <p className="md:text-[0.9375rem] sm:text-[0.875rem] 3sm:text-[0.8rem] text-[#333] font-semibold">
                    5만원이상 무료배송
                  </p>
                  <p>Birthday Party 전상품</p>
                  <p>
                    <span className="text-[#f57778]">
                      5만원이상 결제시 무료배송
                    </span>
                  </p>
                </div>
              </li>

              <li className="cursor-pointer lg:w-1/6 md:w-1/3 2sm:w-1/2 3sm:w-full md:py-1 md:px-4 3sm:py-3 box-border 2sm:border-r-[1px] 2sm:border-b-0 3sm:border-b-[1px] border-solid border-[#ccc] flex 2sm:flex-col items-center 2sm:justify-normal 3sm:justify-center 2sm:gap-x-0 3sm:gap-x-4">
                <CiEdit className="mb-4 md:text-[3rem] sm:text-[2.4rem] 3sm:text-[2rem] text-[#f57778]" />

                <div>
                  <p className="mb-2 md:text-[0.9375rem] sm:text-[0.875rem] 3sm:text-[0.8rem] text-[#333] font-semibold">
                    리뷰 작성시 적립금
                  </p>
                  <p>유형에 따라 적립금</p>
                  <p>
                    <span className="text-[#f57778]">500원 ~ 1500원 차등</span>{" "}
                    지급
                  </p>
                </div>
              </li>

              <li className="box-border flex items-center cursor-pointer 2sm:flex-col 2sm:justify-normal 3sm:justify-center 2sm:gap-x-0 3sm:gap-x-4 md:py-1 md:px-4 3sm:py-3 lg:w-1/6 md:w-1/3 2sm:w-1/2 3sm:w-full">
                <MdFiberNew className="mb-4 md:text-[3rem] sm:text-[2.4rem] 3sm:text-[2rem] text-[#f57778]" />

                <div>
                  <p className="mb-2 md:text-[0.9375rem] sm:text-[0.875rem] 3sm:text-[0.8rem] text-[#333] font-semibold">
                    신상 5% 할인
                  </p>
                  <p>매일 매일 UP되는 신상</p>
                  <p>
                    <span className="text-[#f57778]">5% 할인가</span>에 득템
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="w-full md:py-32 sm:py-24 3sm:pt-8 3sm:pb-10">
            <img
              className="object-cover w-full 2sm:h-auto 3sm:h-[80px] cursor-pointer"
              src={
                process.env.PUBLIC_URL + "/../image/banner/detailBanner1.png"
              }
              alt="detail_banner"
            />
            <img
              className="object-cover w-full 2sm:h-auto 3sm:h-[80px] cursor-pointer md:mt-6 sm:mt-4 3sm:mt-2"
              src={
                process.env.PUBLIC_URL + "/../image/banner/detailBanner2.png"
              }
              alt="detail_banner"
            />
          </div>

          {/* detail page tab */}
          <div className="w-full">
            <div className="flex w-full">
              {category?.map((c) => {
                return (
                  <button
                    onClick={() => {
                      setCat(c);
                    }}
                    className={`${
                      c === cat
                        ? "bg-opacity-100 text-white"
                        : "bg-opacity-0 text-[#333]"
                    } w-1/4 md:py-5 sm:py-3 2sm:py-2 3sm:py-[2px] border-[1px] bg-[#282828] border-solid border-[#ccc] border-b-[#333] rounded-t-lg transition-all duration-700 md:text-[0.9375rem] sm:text-[0.85rem] 3sm:text-[0.8rem] font-semibold`}
                  >
                    {c}
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
                openReviewDetailModal={(id) => {
                  setSelectedReviewId(id);
                  setReviewDetailModalOpen(true);
                }}
                handleClickBenefitBtn={handleClickBenefitBtn}
                handleDeleteReview={handleDeleteReview}
                handleEditReview={handleEditReview}
                handleEditReviewSuccess={handleEditReviewSuccess}
                reviewEdit={reviewEdit}
                setChangeText={setChangeText}
                changeText={changeText}
                openMyBodySizeModal={() => setMyBodySizeModalOpen(true)}
                myBodyInfo={myBodyInfo}
              />
            )}
            {cat === "교환 및 반품" && <DetailCS />}
            {cat === "상품문의" && <DetailQuestion user={user} item={item} />}
          </div>
        </div>
      </div>

      {modalOpen && (
        <Modal user={user} onClose={() => setModalOpen(false)}>
          <div className="flex justify-between w-full">
            <div className="w-[28%] p-5 box-border border-r-[1px] border-solid border-[#e8e8e8]">
              <img
                className="w-full h-[10.875rem] object-fill rounded-lg"
                src={process.env.PUBLIC_URL + `/../${item.image}`}
                alt="item_img"
              />
              <p className="mt-4 text-[#030303] text-[0.9375rem] font-semibold line-clamp-1">
                {item.title}
              </p>
            </div>
            <div className="w-[72%] p-5 box-border">
              <div>
                <div className="flex flex-wrap w-full">
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

              <div className="flex flex-col items-center w-full mt-6 text-center">
                <h1 className="mb-2">상품은 만족하셨나요?</h1>
                <div className="flex items-center">
                  <BasicRating
                    ratingValue={ratingValue}
                    setRatingValue={setRatingValue}
                  />
                  <h1 className="ml-2 text-[1.4em]">{ratingValue}</h1>
                </div>
              </div>

              <div className="flex flex-col items-center w-full mt-3 text-center">
                <h1 className="mb-4">색상은 어떠셨나요?</h1>

                <div className="flex items-center justify-between w-full">
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

              <div className="flex flex-col items-center w-full mt-6 text-center">
                <h1 className="mb-4">사이즈는 잘 맞으셨나요?</h1>

                <div className="flex items-center justify-between w-full">
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

              <div className="flex flex-col items-center w-full mt-6 text-center">
                <h1 className="mb-4">핏이나 만족감은 어떠세요?</h1>

                <div className="relative w-full">
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

              <div className="flex justify-center w-full">
                <Button
                  onClick={(e) => handleStoreReviewData(e)}
                  value="리뷰 쓰기"
                  styleType="blackHover"
                  styles="w-full mt-6 py-3 text-[0.875rem]"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      <DetailReviewModal
        user={user}
        onClose={() => {
          setSelectedReviewId(null);
          setReviewDetailModalOpen(false);
        }}
        reviewDetailModalOpen={reviewDetailModalOpen}
        datas={
          selectedReviewId &&
          firestoreReviewData?.filter(
            (review) => review.id === selectedReviewId
          )
        }
        reviewEdit={reviewEdit}
        handleEditReviewSuccess={handleEditReviewSuccess}
        changeText={changeText}
        setChangeText={setChangeText}
        handleClickBenefitBtn={handleClickBenefitBtn}
        handleEditReview={handleEditReview}
        handleDeleteReview={handleDeleteReview}
      />

      <MyBodySizeModal
        setMyBodySizeModalOpen={setMyBodySizeModalOpen}
        myBodySizeModalOpen={myBodySizeModalOpen}
        setMyHeight={setMyHeight}
        myHeight={myHeight}
        setMyWeight={setMyWeight}
        myWeight={myWeight}
        setMySize={setMySize}
        mySize={mySize}
        setMyFootSize={setMyFootSize}
        myFootSize={myFootSize}
        myBodyInfo={myBodyInfo}
        handleStoreBodySizeInfo={handleStoreBodySizeInfo}
      />
    </div>
  );
}
