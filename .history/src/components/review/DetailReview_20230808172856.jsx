import React from "react";

export default function DetailReview({ setModalOpen, reviewData }) {
  const openModal = () => {
    setModalOpen(true);
  };

  const averageRating = reviewData?.reduce(
    (sum, num) => (sum += num) / reviewData.length,
    0
  );
  console.log(averageRating);

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
        <ul>
          <li>
            <p>구매고객 총 평점</p>
          </li>
        </ul>
      </div>
      <button onClick={openModal}>후기 작성하기</button>
    </div>
  );
}
