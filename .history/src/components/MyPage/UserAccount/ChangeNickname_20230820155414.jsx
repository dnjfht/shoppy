import React from "react";
import { useState } from "react";
import { ChangeNickNameDiv, UserInput } from "../../../pages/MyPage/style";
import { NicknameMessage } from "../../../pages/MyPage/style";
function ChangeNickname({
  name,
  isNickName,
  newNickName,
  setIsNickName,
  setNewNickName,
  setBtnValidation,
  nicknameMessage,
  setNicknameMessage,
  NickNameMessage,
}) {
  const changeNickHandler = (event) => {
    const currentNickname = event.target.value;
    setNewNickName(currentNickname);
    if (currentNickname.length < 2 || currentNickname > 6) {
      setIsNickName(false);
      setNicknameMessage("닉네임은 2글자 이상, 6글자 미만으로 입력해주세요.");
    } else if (name === currentNickname) {
      setBtnValidation(true);
      setNicknameMessage("현재 닉네임과 같아요");
    } else {
      setIsNickName(true);
      setBtnValidation(false);
      setNicknameMessage("사용 가능한 닉네임입니다.");
    }
  };
  return (
    <ChangeNickNameDiv className="닉네임변경">
      <h3 className="mb-4 text-[#ff4273]">닉네임 변경</h3>
      <UserInput
        type="text"
        value={newNickName}
        onChange={(e) => changeNickHandler(e)}
        className="text-[0.8rem] outline"
      ></UserInput>
      <div>
        {isNickName === true ? (
          <NicknameMessage>{nicknameMessage}</NicknameMessage>
        ) : null}
      </div>
    </ChangeNickNameDiv>
  );
}

export default ChangeNickname;
