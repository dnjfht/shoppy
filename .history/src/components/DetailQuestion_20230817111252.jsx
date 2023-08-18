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
        <button className="w-44 py-3 bg-black border-[1px] border-solid border-black rounded-lg text-white text-[0.875rem] hover:bg-tran">
          문의하기
        </button>
      </div>
    </div>
  );
}
