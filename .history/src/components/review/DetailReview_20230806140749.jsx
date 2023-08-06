import React, { useState } from "react";
import { Modal } from "@mui/material";

export default function DetailReview() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>후기 작성하기</button>
      <Modal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}
