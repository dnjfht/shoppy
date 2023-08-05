import React from "react";

export default function DetailCS() {
  return (
    <div className="w-full py-[50px] px-[12rem] overflow-hidden relative">
      <h1>교환 및 반품정보</h1>
      <ul>
        <li>
          결제 완료 상태에서만 주문 취소 & 변경이 가능하며 배송 준비중/배송중
          상태에서는 고객센터로 직접 연락 해주셔야 합니다.
        </li>
        <li>
          입금자명, 입금 금액이 다를 경우 자동 입금 처리되지 않으므로 고객센터로
          연락바랍니다.
        </li>
        <li>
          주소 오류, 연락두절, 고객님의 수취 거부 등으로 인해 반송되는 경우 왕복
          택배비는 고객님 부담입니다.
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
