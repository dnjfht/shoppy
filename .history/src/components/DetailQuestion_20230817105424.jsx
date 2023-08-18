import Button from "../components/Button";
import React, { useState } from "react";

export default function DetailQuestion() {
  // 문의 작성하는 모달 useState
  const [questionModalOpen, setQuestionModalOpen] = useState(false);

  return (
    <div className="w-full py-14 text-[0.875rem] overflow-hidden relative">
      <div>
        <p>궁금한점을 해결해드립니다.</p>
        <p>
          먼저 FAQ를 확인하시면 보다 유용한 정보를 빠르게 확인할 수 있습니다.
        </p>
      </div>

      <div>
        <Button value="문의하기" />
      </div>
    </div>
  );
}