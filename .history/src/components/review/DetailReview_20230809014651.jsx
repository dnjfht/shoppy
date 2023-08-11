import React from "react";
import RatingResult from "./RatingResult";

export default function DetailReview({ setModalOpen, reviewData, item }) {
  const openModal = () => {
    setModalOpen(true);
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
                  <p>똑같아요</p>

                  <div className="w-8/12 h-4 bg-transparent border-[1px] border-solid border-[#e0e0e0e0] rounded-full relative">
                    <span
                      className="h-4 bg-[#d3d3d3] rounded-full absolute top-0 left-0 transition-all duration-700"
                      style={progressBarStyle}
                    />
                  </div>
                  <p className="text-[1.125rem]">{`${colorSamePrecent}%`}</p>
                </div>
              </div>

              {/* 사이즈 */}
              <div className="w-1/5 py-2 text-[#343434] border-[1px] border-solid border-[#c4c4c4] rounded-full">
                <div className="w-1/5 py-2 text-[#343434] font-normal border-[1px] border-solid border-[#c4c4c4] rounded-full">
                  <p>사이즈</p>
                </div>

                <div className="w-[76%] flex justify-between items-center">
                  <p>잘 맞아요</p>

                  <div className="w-8/12 h-4 bg-transparent border-[1px] border-solid border-[#e0e0e0e0] rounded-full relative">
                    <span
                      className="h-4 bg-[#d3d3d3] rounded-full absolute top-0 left-0 transition-all duration-700"
                      style={progressBarStyle2}
                    />
                  </div>
                  <p className="text-[1.125rem]">{`${sizeSamePrecent}%`}</p>
                </div>
              </div>
            </div>
          </li>

          <li className="w-1/3 text-[0.8125rem]">
            <p>평점 비율</p>
            <div></div>
          </li>
        </ul>
      </div>
      <button onClick={openModal}>후기 작성하기</button>
    </div>
  );
}
