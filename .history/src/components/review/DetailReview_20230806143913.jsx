import React, { useState } from "react";
import { Modal } from "@mui/material";
import BasicRating from "./BasicRating";

export default function DetailReview({ modalOpen, setModalOpen }) {
  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <button onClick={openModal}>후기 작성하기</button>
    </div>
  );
}
