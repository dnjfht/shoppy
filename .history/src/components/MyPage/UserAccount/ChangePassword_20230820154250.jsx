import React, { useState } from "react";

import { authService } from "../../../api/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  ChangePasswordDiv,
  UserInput,
  changePwtext,
  ChangePwtext,
  NewPassword,
} from "../../../pages/MyPage/style";

import { debounce } from "lodash";

function ChangePassword({
  currentUser,
  password,
  setPassword,
  userPassword,
  setUserPassword,
  editUserPassword, //현재 비밀번호 확인
  setEditUserPassword, //현재 비밀번호 확인
  setBtnValidation, //btn활성화
  inputValidationConfirm,
  setInputValidationConfirm,
  passwordMessage,
  setPasswordMessage,
  corfirmPasswordMessage,
  setConfirmPasswordMessage,
  doubleCheckPasswordMessage,
  setDoubleCheckPasswordMessage,
}) {
  const [inputValidation, setInputValidation] = useState(true);

  //첫번째 인풋 state

  const [isPassword, setIsPassword] = useState(false);

  //두번째 인풋 state

  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  //세번째 인풋 state
  const [isDoublePasswordConfirm, setIsDoublePasswordConfirm] = useState(false);

  const email = currentUser.email; //현재 로그인한 유저의 이메일

  //현재 비밀번호 확인 함수
  const onChangePassword = (event) => {
    const currentPassword = event.target.value;
    setEditUserPassword(currentPassword);
    signInWithEmailAndPassword(authService, email, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const passwordRegex =
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegex.test(currentPassword)) {
          setPasswordMessage(
            "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
          );
          setIsPassword(false);
          setBtnValidation(true);
        } else {
          setIsPassword(true);
          setBtnValidation(true);
          setInputValidation(false);
          setPasswordMessage("비밀번호가 일치해요");
        }
      })
      .catch((error) => {
        setInputValidation(true);
        setPasswordMessage("비밀번호가 틀렸어요");
      });
  };
  //모든 input값이 입력되면 그때 함수 실행
  const debounceFunc = debounce(onChangePassword, 300);

  // 새 비밀번호 확인
  const changePassword = (event) => {
    setPassword(event.target.value);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(event.target.value)) {
      setConfirmPasswordMessage(
        "대소문자, 특수문자를 포함하여 8자리 이상 입력해주세요."
      );
      setBtnValidation(true);
      setIsPasswordConfirm(false);
    } else if (event.target.value === userPassword) {
      setBtnValidation(true);
      setDoubleCheckPasswordMessage("비밀번호가 일치하지 않습니다.");
    } else if (event.target.value === editUserPassword) {
      setBtnValidation(true);
      setIsPasswordConfirm(false);
      setInputValidationConfirm(true);
      setConfirmPasswordMessage("현재 비밀번호와 일치해요!");
    } else {
      setBtnValidation(true);
      setIsPasswordConfirm(true);
      setInputValidationConfirm(false);
      setConfirmPasswordMessage("사용 가능한 비밀번호 형식입니다.");
    }
  };
  //새 비밀번호 두번째 확인
  const changeConfirmPassword = (event) => {
    const currentPasswordConfirm = event.target.value;
    setUserPassword(currentPasswordConfirm);
    if (password === currentPasswordConfirm) {
      setBtnValidation(false);
      setIsDoublePasswordConfirm(true);
      setDoubleCheckPasswordMessage("비밀번호가 일치해요.");
    } else if (event.target.value !== password) {
      setBtnValidation(true);
      setDoubleCheckPasswordMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setBtnValidation(true);
      setIsDoublePasswordConfirm(false);
      setDoubleCheckPasswordMessage("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <>
      <ChangePasswordDiv className="비밀번호변경">
        {/* 기존의 비밀번호 */}
        <h3>비밀번호 변경</h3>
        <p className="password">기존 비밀번호 </p>
        <UserInput
          className="py-5"
          type="password"
          onChange={debounceFunc}
          placeholder="현재 비밀번호를 입력해주세요"
        />
        {isPassword === true ? (
          <p style={{ color: "green" }} className="passwordMessage">
            {passwordMessage}
          </p>
        ) : (
          <p className="passwordMessage">{passwordMessage}</p>
        )}

        {/* 새비밀번호 */}
        <div>
          <p className="newPassword">새 비밀번호</p>
          <ChangePwtext>
            8~16자 이내의 영문, 숫자, 기호를 포함한 문자열
          </ChangePwtext>
        </div>
        <UserInput
          type="password"
          value={password}
          onChange={(e) => changePassword(e)}
          disabled={inputValidation}
        />
        {isPasswordConfirm === true ? (
          <p style={{ color: "green" }} className="passwordMessage">
            {corfirmPasswordMessage}
          </p>
        ) : (
          <p className="passwordMessage">{corfirmPasswordMessage}</p>
        )}
        {/* 새비밀번호 확인 */}
        <p className="confirmNewPassword">새 비밀번호 확인</p>
        <UserInput
          type="password"
          disabled={inputValidationConfirm}
          onChange={(e) => {
            changeConfirmPassword(e);
          }}
          value={userPassword}
        />
        {isDoublePasswordConfirm === true ? (
          <p style={{ color: "green" }} className="passwordMessage">
            {doubleCheckPasswordMessage}
          </p>
        ) : (
          <p className="passwordMessage">{doubleCheckPasswordMessage}</p>
        )}
      </ChangePasswordDiv>
    </>
  );
}

export default ChangePassword;
