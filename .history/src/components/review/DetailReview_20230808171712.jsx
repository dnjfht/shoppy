import React from "react";

export default function DetailReview({ setModalOpen }) {
  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="w-full py-14 overflow-hidden relative">
      <div>
        <img
          src={process.env.PUBLIC_URL + "/image/banner/review_event.png"}
          alt="review_event"
        />

        <img
          src={process.env.PUBLIC_URL + "/image/banner/filter_good_banners.png"}
          alt="filter_good_banners"
        />
      </div>
      <button onClick={openModal}>후기 작성하기</button>
    </div>
  );
}
