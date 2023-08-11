import React from "react";
import RatingResult from "./RatingResult";

export default function DetailReview({ setModalOpen, reviewData }) {
  const openModal = () => {
    setModalOpen(true);
  };

  const averageRating =
    reviewData?.reduce((sum, item) => sum + item.ratingValue, 0) /
    reviewData.length;

  const averageRatingResult = Math.floor((averageRating * 1000) / 1000).toFixed(
    0
  );

  const filterColorSame = reviewData.filter((review) =>
    review.reviewColorSatisfaction.includes("똑같아요")
  );
  const colorSamePrecent = (filterColorSame.length / reviewData.length) * 100;
  const progressBarStyle = {
    width: `${colorSamePrecent}%`,
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
        <ul className="w-full flex justify-between">
          <li className="w-1/3 py-6 text-[0.9375rem] text-center text-[#1e1d1d] font-semibold border-r-[1px] border-solid border-[#f3f3f3]">
            <p>구매고객 총 평점</p>
            <div className="mt-8">
              <p className="text-[2.6875rem]">{averageRatingResult}</p>
              <div>
                <RatingResult averageRatingResult={averageRatingResult} />
              </div>
            </div>
          </li>

          <li className="w-1/3 py-6 text-[0.9375rem] text-center text-[#1e1d1d] font-semibold border-r-[1px] border-solid border-[#f3f3f3]">
            <p>평점 비율</p>
            <div>
              {/* 색상 */}
              <div>
                <div>
                  <p>색상</p>
                </div>

                <div>
                  <p>똑같아요</p>

                  <div className="w-full h-4 bg-transparent border-[1px] border-solid border-[#e0e0e0e0] rounded-full relative">
                    <span
                      className="h-4 bg-[#d3d3d3] rounded-full absolute top-0 left-0"
                      style={progressBarStyle}
                    />
                  </div>
                  <p>{`${colorSamePrecent}%`}</p>
                </div>
              </div>

              {/* 사이즈 */}
              <div>
                <div>
                  <p>사이즈</p>
                </div>

                <div>
                  <p>잘 맞아요</p>

                  <div>
                    <span />
                  </div>
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
