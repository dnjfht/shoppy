import React from "react";

export default function DetailReview({ setModalOpen, item }) {
  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <button onClick={openModal}>후기 작성하기</button>
    </div>
  );
}
