import React from "react";

export default function DetailCS() {
  return (
    <div className="w-full py-14 overflow-hidden relative">
      <h1 className="mb-6 text-[1.3rem] text-[#333] font-semibold">
        교환 및 반품정보
      </h1>
      <ul className="list-disc text-[0.875rem] text-[#333] font-medium">
        <li>
          <p>
            결제 완료 상태에서만 주문 취소 & 변경이 가능하며 배송 준비중/배송중
            상태에서는 고객센터로 직접 연락 해주셔야 합니다.
          </p>
        </li>
        <li>
          <p>
            입금자명, 입금 금액이 다를 경우 자동 입금 처리되지 않으므로
            고객센터로 연락바랍니다.
          </p>
        </li>
        <li>
          <p>
            주소 오류, 연락두절, 고객님의 수취 거부 등으로 인해 반송되는 경우
            왕복 택배비는 고객님 부담입니다.
          </p>
        </li>
        <li>
          <p>
            상품 품절 또는 배송 지연의 경우 고객님께 개별적으로 안내드리고
            있습니다.
          </p>
          <p>배송방법 : CJ대한통운 택배 (1588-1255)</p>
          <p>배송지역 : 전국지역</p>
          <p>배송비용 : 배송료 2,500원(제주, 도서산간은 추가비용 발생)</p>
          <p>
            배송기간 : 오후 1시까지 입금 주문건에 한해 당일발송, 접수일로부터
            2~3일(일,공휴일 제외)
          </p>
        </li>
        <li>
          <p>수령 후 7일 이내 CJ대한통운(1588-1255) 택배사 수거접수</p>
          <p>
            ※ 택배(편의점 포함) 이용 시 선불로 발송 / 착불 발송 시 추가 요금은
            고객님 부담입니다.
          </p>
        </li>
        <li>
          <p>
            반송 택배는 상품 수거 후 2~4일 이내 물류센터 입고되며 업체 도착 확인
            후 1~2일 이내 처리 예정
          </p>
        </li>
        <li>
          <p>교환&반품 메모 작성하여 상품과 함께 동봉 (미동봉시 처리 지연)</p>
        </li>
        <li>
          <p>교환 상품은 하나의 상품당 하나로만 가능</p>
        </li>
        <li>
          <p>
            택배비는 계좌 입금을 권해드립니다 (동봉 시 분실 될 경우 책임지지
            않습니다.
          </p>
        </li>
        <li>
          <p>마감 처리 실밥, 구김은 불량 사유에 해당되지 않습니다.</p>
        </li>
        <li>
          <p>모든 제품은 회수 확인 후 처리됩니다. (맞교환 불가)</p>
        </li>
        <li>
          <p>불량 교환은 동일한 상품/색상/사이즈를 원칙으로 합니다.</p>
        </li>
        <li>
          <p>
            하자 상품이더라도 다른 상품으로 변경 시 배송비 2,500원을
            부담해주셔야 합니다.
          </p>
        </li>
        <li>
          <p>
            상품 출고이후 각지역 배송사 사정에따라 수령일 상이할 수 있으며 ,
            출고이후 수령일로 인한 무상반품은 불가합니다.
          </p>
          <p>
            (출고이후 자세한 배송상황은 택배사쪽으로 직접 문의주셔야합니다.)
          </p>
        </li>
      </ul>
    </div>
  );
}