import React from "react";

export default function Footer() {
  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto">
        <ul className="flex justify-between items-center">
          <li>
            <h3>ABOUT US</h3>

            <p>
              company. (주)Birthday Party owner. 유승민 personal info manager.
              유승민
              <br />
              email. BirthdayParty@Birthdayparty.co.kr business no. 123-45-67890
              mail order license.
            </p>
            <p>
              2023-부산진구-1111 [사업자정보확인] address. [00000] 부산광역시
              진구
              <br />
              서전로 10번길
            </p>
          </li>

          <li>
            <h3>CUSTOMER CENTER</h3>

            <p>mon - fri am10:00 - pm5:30</p>
            <p>lunch pm12:00-pm1:00</p>
            <p>sat, sun, holiday off</p>
          </li>

          <li>
            <h3>BANK ACCOUNT</h3>

            <p>기업 986-016196-04-015</p>
            <p>예금주:주식회사 이로아</p>
          </li>

          <li>
            <h3>SHOP INFO</h3>

            <p>회사소개</p>
            <p>이용약관안내</p>
            <p>개인정보취급방침</p>
            <p>이용안내</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
