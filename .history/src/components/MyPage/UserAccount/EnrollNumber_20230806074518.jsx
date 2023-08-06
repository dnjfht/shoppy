import React from "react";
import { EnrollNumberDiv, UserInput } from "../../../pages/MyPage/style";

function EnrollNumber({ phoneNum, setPhoneNum, currentUser, phoneList }) {
  // console.log(currentUser.providerData[0].phoneNumber); //  null
  const changePhoneNumHanlder = (e) => {
    setPhoneNum(e.target.value);
  };
  return (
    <EnrollNumberDiv className="연락처등록">
      <h3 style={{ fontSize: "25px" }}>연락처 등록</h3>
      <UserInput
        type="text"
        placeholder="010-1234-5678"
        // value={phoneNum}
        onChange={(e) => changePhoneNumHanlder(e)}
        disabled
      ></UserInput>
    </EnrollNumberDiv>
  );
}

export default EnrollNumber;
