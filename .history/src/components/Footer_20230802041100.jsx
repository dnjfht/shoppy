import React from "react";

export default function Footer() {
  return (
    <div className="w-full border-t-[1px] border-solid border-[#e9e9e9]">
      <div className="w-[1400px] mx-auto">
        <ul className="py-12 flex justify-between">
          <li>
            <h3 className="text-[1rem] font-bold">ABOUT US</h3>

            <div className="text-[0.8125rem] mt-4">
              <p className="mb-1">
                company. (주)Birthday Party owner. 유승민 personal info manager.
                유승민
              </p>
              <p className="mb-1">
                email. BirthdayParty@Birthdayparty.co.kr business no.
                123-45-67890 mail order license.
              </p>
              <p>
                2023-부산진구-1111 [사업자정보확인] address. [00000] 부산광역시
                진구
                <br />
                서전로 10번길
              </p>
            </div>
          </li>

          <li>
            <h3 className="text-[1rem] font-bold">CUSTOMER CENTER</h3>

            <div className="text-[0.8125rem] mt-4">
              <p className="mb-1">mon - fri am10:00 - pm5:30</p>
              <p className="mb-1">lunch pm12:00-pm1:00</p>
              <p>sat, sun, holiday off</p>
            </div>
          </li>

          <li>
            <h3 className="text-[1rem] font-bold">BANK ACCOUNT</h3>

            <div className="text-[0.8125rem] mt-4">
              <p className="mb-1">기업 986-016196-04-015</p>
              <p>예금주:주식회사 이로아</p>
            </div>
          </li>

          <li>
            <h3 className="text-[1rem] font-bold">SHOP INFO</h3>

            <div className="text-[0.8125rem] mt-4">
              <p className="mb-1">회사소개</p>
              <p className="mb-1">이용약관안내</p>
              <p className="mb-1">개인정보취급방침</p>
              <p>이용안내</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
