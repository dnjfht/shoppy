import React from "react";

export default function DetailReview({ setModalOpen }) {
  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="w-full py-[50px] px-[12rem] overflow-hidden relative">
      <div>
        <img
          src={process.env.PUBLIC_URL + "/image/banner/review_event.png"}
          alt="review_event"
        />
      </div>
      <button onClick={openModal}>후기 작성하기</button>
    </div>
  );
}
