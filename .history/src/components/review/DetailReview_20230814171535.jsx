import React, { useEffect, useRef, useState } from "react";
import RatingResult from "./RatingResult";
import ReviewImgSlider from "./ReviewImgSlider";
import { isLoggedIn } from "../../utils/utils";
import User from "../../components/User";
import RatingResult2 from "./RatingResult2";

import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

export default function DetailReview({
  setModalOpen,
  reviewData,
  item,
  user,
  openReviewDetailModal,
  handleClickBenefitBtn,
  handleDeleteReview,
  handleEditReview,
  handleEditReviewSuccess,
  reviewEdit,
  setChangeText,
  changeText,
}) {
  console.log(reviewData);
  const openModal = () => {
    setModalOpen(true);
  };

  const [color, setColor] = useState("선택없음");
  const [size, setSize] = useState("선택없음");
  const [filter, setFilter] = useState("최신순");
  const [search, setSearch] = useState({ color, size, filter });
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [reviewOfMyBodyType, setReviewOfMyBodyType] = useState(false);

  const colorInputRef = useRef(null);
  const sizeInputRef = useRef(null);
  const filterInputRef = useRef(null);

  const handleSelectColor = (e) => {
    setColor(e.target.value);
  };

  const handleSelectSize = (e) => {
    setSize(e.target.value);
  };

  const handleSelectFilter = (e) => {
    setFilter(e.target.value);
  };

  // 별점 평균값 구하기

  // 1.상세페이지 제품 관련 리뷰만 필터링하기
  const accordReview = reviewData.filter((data) => data.productId === item.id);
  // 2. 필터링 해준 배열 안에서 ratingValue 평균 구하기.
  console.log(accordReview.length);
  const averageRating =
    accordReview?.reduce((sum, item) => sum + item.ratingValue, 0) /
    accordReview.length;
  // 3. 결과로 나온 값의 소숫점을 모두 잘라내기.
  const averageRatingResult =
    accordReview.length === 0
      ? 0
      : Math.floor((averageRating * 1000) / 1000).toFixed(0);

  // 평점 비율 구하기(색상)

  // 2. 필터링 해준 배열 안에서 색상이 "똑같아요"인 것만 필터링 걸기
  const filterColorSame = accordReview.filter((review) =>
    review.reviewColorSatisfaction.includes("똑같아요")
  );
  // 3. 색상 평점 퍼센트 구하기 + 소숫점 없애기
  const colorSamePrecent =
    accordReview.length === 0
      ? 0
      : Math.floor((filterColorSame.length / accordReview.length) * 100);
  const progressBarStyle = {
    width: `${colorSamePrecent}%`,
  };

  // 평점 비율 구하기(사이즈)

  // 2. 필터링 해준 배열 안에서 사이즈가 "잘맞아요"인 것만 필터링 걸기
  const filterSizeSame = accordReview.filter((review) =>
    review.reviewSizeSatisfaction.includes("잘맞아요")
  );
  // 3. 사이즈 평점 퍼센트 구하기 + 소숫점 없애기
  const sizeSamePrecent =
    accordReview.length === 0
      ? 0
      : Math.floor((filterSizeSame.length / accordReview.length) * 100);
  const progressBarStyle2 = {
    width: `${sizeSamePrecent}%`,
  };

  // 검색 필터
  const handleClickSearch = (e) => {
    e.preventDefault();

    setSearch((prev) => ({ ...prev, color, size, filter }));
  };

  useEffect(() => {
    let filteredList = accordReview;

    if (search.color !== "선택없음") {
      filteredList = filteredList.filter(
        (review) => review.reviewColor === search.color
      );
    }

    if (search.size !== "선택없음") {
      filteredList = filteredList.filter(
        (review) => review.reviewSize === search.size
      );
    }

    // 평점 순으로 정렬
    if (search.filter === "평점순") {
      filteredList = filteredList.sort((a, b) => b.ratingValue - a.ratingValue);
    }

    // 추천순으로 정렬
    if (search.filter === "추천순") {
      filteredList = filteredList.sort((a, b) => b.count - a.count);
    }

    // 최신순으로 정렬
    if (search.filter === "최신순") {
      filteredList = filteredList.sort((a, b) => b.createdAt - a.createdAt);
    }

    setFilteredReviews(filteredList);
  }, [search, reviewData]);

  return (
    <div className="w-full py-14 overflow-hidden relative">
      <div>
        <img
          src={process.env.PUBLIC_URL + "/image/banner/review_event.png"}
          alt="review_event"
        />

        <img
          className="mt-5"
          src={process.env.PUBLIC_URL + "/image/banner/filter_good_banners.png"}
          alt="filter_good_banners"
        />
      </div>

      {/* 리뷰 관련 영역 */}
      <div>
        {/* 제품 평균 리뷰*/}
        <ul className="w-full mt-6 flex justify-between">
          <li className="w-1/3 py-6 text-[0.9375rem] text-center text-[#1e1d1d] font-semibold border-r-[1px] border-solid border-[#f3f3f3]">
            <p>구매고객 총 평점</p>
            <div className="mt-8">
              <p className="text-[2.6875rem]">{averageRatingResult}</p>
              <div>
                <RatingResult averageRatingResult={averageRatingResult} />
              </div>
            </div>
          </li>

          <li className="w-1/3 px-6 py-6 box-border text-[0.9375rem] text-center text-[#1e1d1d] font-semibold border-r-[1px] border-solid border-[#f3f3f3] flex flex-col justify-between items-center">
            <p>평점 비율</p>
            <div className="w-full flex-col items-center">
              {/* 색상 */}
              <div className="w-full mb-5 flex justify-between items-center font-normal">
                <div className="w-1/5 py-2 text-[#343434] border-[1px] border-solid border-[#c4c4c4] rounded-full">
                  <p>색상</p>
                </div>

                <div className="w-[76%] flex justify-between items-center">
                  <p className="w-3/12">똑같아요</p>

                  <div className="w-7/12 h-4 bg-transparent border-[1px] border-solid border-[#e0e0e0e0] rounded-full relative">
                    <span
                      className="h-4 bg-[#d3d3d3] rounded-full absolute top-0 left-0 transition-all duration-700"
                      style={progressBarStyle}
                    />
                  </div>
                  <p className="w-2/12 text-[1.125rem]">{`${colorSamePrecent}%`}</p>
                </div>
              </div>

              {/* 사이즈 */}
              <div className="w-full flex justify-between items-center font-normal">
                <div className="w-1/5 py-2 text-[#343434] font-normal border-[1px] border-solid border-[#c4c4c4] rounded-full">
                  <p>사이즈</p>
                </div>

                <div className="w-[76%] flex justify-between items-center">
                  <p className="w-3/12">잘 맞아요</p>

                  <div className="w-7/12 h-4 bg-transparent border-[1px] border-solid border-[#e0e0e0e0] rounded-full relative">
                    <span
                      className="h-4 bg-[#d3d3d3] rounded-full absolute top-0 left-0 transition-all duration-700"
                      style={progressBarStyle2}
                    />
                  </div>
                  <p className="w-2/12 text-[1.125rem]">{`${sizeSamePrecent}%`}</p>
                </div>
              </div>
            </div>
          </li>

          <li className="w-1/3 px-6 py-6 box-border text-[0.9375rem] text-center text-[#1e1d1d] font-semibold flex flex-col justify-between items-center">
            <p>리뷰필터</p>
            <div className="w-full flex flex-col items-center text-[0.75rem] font-normal">
              <div className="w-full flex justify-between items-center">
                <select
                  ref={colorInputRef}
                  onChange={(e) => handleSelectColor(e)}
                  className="w-[31%] py-3 border-[1px] border-solid border-[#cbcbcb] rounded-full text-center cursor-pointer outline-none"
                >
                  <option disabled selected>
                    옵션색상
                  </option>
                  <option value="선택없음" key="선택없음">
                    선택없음
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

                <select
                  ref={sizeInputRef}
                  onChange={(e) => handleSelectSize(e)}
                  className="w-[31%] py-3 border-[1px] border-solid border-[#cbcbcb] rounded-full text-center cursor-pointer outline-none"
                >
                  <option disabled selected>
                    옵션색상
                  </option>
                  <option value="선택없음" key="선택없음">
                    선택없음
                  </option>
                  {item &&
                    item?.option?.size?.map((s) => {
                      return (
                        <option value={s} key={s} className="hover:bg-black">
                          {s}
                        </option>
                      );
                    })}
                </select>

                <select
                  ref={filterInputRef}
                  onChange={(e) => handleSelectFilter(e)}
                  className="w-[31%] py-3 border-[1px] border-solid border-[#cbcbcb] rounded-full text-center cursor-pointer outline-none"
                >
                  <option
                    value="최신순"
                    key="최신순"
                    selected
                    className="hover:bg-black"
                  >
                    최신순
                  </option>

                  <option
                    value="추천순"
                    key="추천순"
                    className="hover:bg-black"
                  >
                    추천순
                  </option>

                  <option
                    value="평점순"
                    key="평점순"
                    className="hover:bg-black"
                  >
                    평점순
                  </option>
                </select>
              </div>
              <input
                onClick={handleClickSearch}
                className="w-full py-3 mt-3 bg-[#ff4273] rounded-full text-white text-[0.875rem] cursor-pointer"
                type="button"
                value="검색"
              />
            </div>
          </li>
        </ul>

        <div className="mt-7 mb-8">
          <ReviewImgSlider
            filteredReviews={filteredReviews}
            user={user}
            openReviewDetailModal={openReviewDetailModal}
          />
        </div>

        <div className="w-full">
          <div className="w-full py-3 flex justify-between items-center border-b-[1px] border-solid border-[#dedede]">
            <div className="flex items-center">
              <button
                className={`${
                  !reviewOfMyBodyType ? "text-[#cacaca]" : "text-[#ff4273]"
                } text-[2.6rem]`}
              >
                {!reviewOfMyBodyType ? <BsToggleOff /> : <BsToggleOn />}
              </button>
              <button className="ml-3 flex items-center">
                <p className="text-[0.9375rem] text-[#333]">
                  내 체형 리뷰만 보기
                </p>
                <div className="ml-2 text-[1.4rem]">
                  <CiEdit />
                </div>
              </button>
            </div>
            <button
              className="pb-1 border-b-[1px] border-solid border-[#ff4273] text-[#ff4273] text-[0.875rem] italic"
              onClick={openModal}
            >
              리뷰쓰기
            </button>
          </div>

          <ul className="w-full py-6">
            {filteredReviews.length < 1 && <p>등록된 리뷰가 없습니다...!</p>}

            {filteredReviews &&
              filteredReviews?.map((review) => (
                <li
                  className="w-full pt-10 pb-10 flex justify-between border-b-[1px] border-solid border-[#dedede]"
                  key={review.id}
                >
                  {/* 리뷰 내용 출력 */}
                  <div className="w-2/12">
                    {isLoggedIn && user && <User user={user} />}
                    {user === null && (
                      <div className="flex items-center">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/image/defaultImage.png"
                          }
                          alt="profile_img"
                        />
                        <p className="ml-3 mb-1 text-[0.875rem] text-[#333] font-semibold">
                          {`${review.phoneNumber.substring(0, 7)}****`}
                        </p>
                      </div>
                    )}

                    <p className="mt-6 text-[#a1a1a1] font-semibold">{`${review.reviewHeight}cm | ${review.reviewWeight}kg | ${review.reviewBodySize}size | ${review.reviewBodyFoot}mm`}</p>
                  </div>

                  <div className="w-9/12">
                    <div className="mb-2 flex items-center">
                      <RatingResult2 ratingValue={review.ratingValue} />
                      <p className="mt-[-6px] ml-2 font-semibold">
                        {review.ratingValue}
                      </p>
                    </div>

                    <div className="py-[15px] px-[23px] border-[1px] border-dashed border-[#cdcdcd] rounded-xl inline-flex">
                      <p className="flex items-center text-[0.9375rem]">
                        선택한 옵션1 : {review.reviewColor} -
                        <span className="ml-1 text-[#ff9691] font-semibold">
                          {review.reviewColorSatisfaction}
                        </span>
                      </p>

                      <p className="mx-3">|</p>

                      <p className="flex items-center text-[0.9375rem]">
                        선택한 옵션2 : {review.reviewSize} -
                        <span className="ml-1 text-[#ff9691] font-semibold">
                          {review.reviewSizeSatisfaction}
                        </span>
                      </p>
                    </div>

                    {!reviewEdit.isActive && (
                      <p className="mt-5 text-[0.875rem] text-[#333]">
                        {review.content}
                      </p>
                    )}

                    {reviewEdit.isActive && reviewEdit.id === review.id && (
                      <form
                        onSubmit={(e) => handleEditReviewSuccess(e, review.id)}
                      >
                        <input
                          defaultValue={review.content}
                          onChange={(e) => {
                            e.preventDefault();
                            setChangeText(e.target.value);
                          }}
                          value={changeText}
                          className="w-3/4 mt-5 p-3 box-border border-[1px] border-solid border-[#afafaf] rounded-lg outline-none text-[0.875rem] placeholder:text-[0.875rem]"
                          type="text"
                          placeholder="수정할 내용을 입력하세요."
                        />
                        <button
                          type="submit"
                          className="w-[120px] ml-2 p-3 bg-[#282828] text-white rounded-lg"
                        >
                          수정 완료
                        </button>
                      </form>
                    )}

                    <div className="mt-6 flex items-center">
                      <p className="text-[0.8125rem] text-[#8D8B8B]">
                        <span className="text-[0.875rem] text-[#000] font-semibold">{`${review.count}명`}</span>
                        에게 도움이 되었습니다.
                      </p>

                      <button
                        onClick={(e) => handleClickBenefitBtn(e, review.id)}
                        className="w-[100px] h-[30px] ml-2 border-[1px] border-solid border-[#ff4273] text-[0.8125rem] text-[#ff4273] flex justify-center items-center"
                      >
                        도움이 돼요
                      </button>
                    </div>

                    <div className="mt-14 flex items-center">
                      {user && user.uid === review.userId && (
                        <>
                          <button
                            onClick={(e) =>
                              handleEditReview(e, review.password, review.id)
                            }
                            className="w-[120px] h-[40px] bg-[#000000] text-white border-[1px] border-solid border-[#000000] text-[0.8125rem] rounded-lg hover:text-[#000000] hover:bg-opacity-0 transition-all duration-700 flex justify-center items-center"
                          >
                            수정하기
                          </button>
                          <button
                            onClick={(e) =>
                              handleDeleteReview(e, review.password, review.id)
                            }
                            className="w-[120px] h-[40px] ml-2 bg-[#000000] text-white border-[1px] border-solid border-[#000000] text-[0.8125rem] rounded-lg hover:text-[#000000] hover:bg-opacity-0 transition-all duration-700 flex justify-center items-center"
                          >
                            삭제하기
                          </button>
                        </>
                      )}

                      {user === null && (
                        <>
                          {reviewEdit.isActive === false ||
                            (reviewEdit.id !== review.id && (
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
                            ))}

                          <button
                            onClick={(e) =>
                              handleDeleteReview(e, review.password, review.id)
                            }
                            className={`${
                              reviewEdit.isActive === false ? "ml-2" : "ml-none"
                            } w-[120px] h-[40px]  bg-[#000000] text-white border-[1px] border-solid border-[#000000] text-[0.8125rem] rounded-lg hover:text-[#000000] hover:bg-opacity-0 transition-all duration-700 flex justify-center items-center`}
                          >
                            삭제하기
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
