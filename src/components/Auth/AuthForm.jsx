import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "./GoogleLogin";

import LabelInput from "../input/LabelInput";
import TypeInput from "../input/TypeInput";
import Button from "../button/Button";

const AuthForm = ({
  title,
  email,
  setEmail,
  changeEmail,
  emailValid, // login 실시간 유효성 검사
  emailMessage, // sign up 실시간 유효성 검사
  isEmail, // sign up 실시간 유효성 검사
  password,
  setPassword,
  changePassword,
  passwordValid, // login 실시간 유효성 검사
  passwordMessage, // sign up 실시간 유효성 검사
  isPassword, // sign up 실시간 유효성 검사
  confirmPassword,
  setConfirmPassword,
  changeConfirmPassword,
  passwordConfirmMessage, // sign up 실시간 유효성 검사
  isPasswordConfirm, // sign up 실시간 유효성 검사
  nickname,
  setNickname,
  changeNickname,
  nicknameMessage, // sign up 실시간 유효성 검사
  isNickname, // sign up 실시간 유효성 검사
  submitSignUp,
  submitLogin,
}) => {
  const signUp = title === "회원가입";

  // *** 회원가입 버튼 활성화 ***
  const [signUpEnabled, setSignUpEnabled] = useState(true);
  useEffect(() => {
    if (isNickname && isPassword && isPasswordConfirm && isEmail) {
      setSignUpEnabled(false);
      return;
    }
    setSignUpEnabled(true);
  }, [isNickname, isPassword, isPasswordConfirm, isEmail]);

  const isEmailCheck =
    (signUp && email?.length > 0) ||
    (!signUp && !emailValid && email?.length > 0)
      ? "block"
      : "hidden";
  const emailCheckComment = signUp ? emailMessage : "이메일을 확인해주세요.";

  const isPasswordCheck =
    (signUp && password?.length > 0) ||
    (!signUp && !passwordValid && password?.length > 0)
      ? "block"
      : "hidden";
  const passwordCheckComment = signUp
    ? passwordMessage
    : "비밀번호를 확인해주세요.";

  return (
    <div className="w-full md:pt-[180px] md:pb-[80px] sm:pt-[150px] sm:pb-[50px] 3sm:pt-[120px] 3sm:pb-[40px]">
      <div className="w-full md:max-w-[50%] 3sm:max-w-[90%] mx-auto">
        <div className="w-full text-center">
          <div className={`${signUp ? "hidden" : "block"}`}>
            <div className="flex items-center justify-center gap-x-3">
              <img
                className="md:w-[100px] 3sm:w-[60px]"
                src={process.env.PUBLIC_URL + `/image/logo.png`}
                alt="logo_img"
              />
              <p className="font-[InkLipquid] text-black md:text-[2.4rem] 3sm:text-[2rem]">
                Birthday Party
              </p>
            </div>

            <h1 className="md:text-[2.6rem] sm:text-[2.2rem] 3sm:text-[1.8rem] font-bold">
              매일이 생일인 것처럼.
            </h1>
          </div>

          <h1
            className={`${
              signUp ? "block" : "hidden"
            } md:text-[3rem] sm:text-[2.4rem] 3sm:text-[2rem] font-bold`}
          >
            {title}
          </h1>

          <div className="w-full md:mt-4 3sm:mt-2 md:text-[1.1rem] sm:text-[1rem] 3sm:text-[0.9rem] text-[#343434] flex items-center gap-x-2 justify-center">
            {signUp ? "이미 회원이신가요?" : "아직 회원이 아니신가요?"}
            <Link
              className="decoration-none"
              to={signUp ? "/login" : "/signUp"}
            >
              <p className="text-[#ff4273]">
                {signUp ? "로그인하기" : "회원가입하기"}
              </p>
            </Link>
          </div>
        </div>

        <div className="w-full mt-4">
          <LabelInput
            htmlFor="email"
            text="이메일"
            divStyle="xl:w-[60%] 3sm:w-full mb-4 mx-auto"
            labelStyle="text-[0.9rem] font-bold"
          >
            <TypeInput
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              text={email}
              setText={setEmail}
              onChange={changeEmail}
              divStyles="w-full mt-2"
              inputStyles="px-4 py-3 rounded-lg placeholder:text-[0.9rem]"
              deleteButtonStyle="md:w-8 3sm:w-6 md:h-8 3sm:h-6 md:top-2 3sm:top-3 right-3"
              styleType="auth"
            />
            <p
              className={`${isEmailCheck} mt-2 text-[0.8rem] ${
                emailValid || isEmail ? "text-[#069144]" : "text-[#ff0000]"
              }`}
            >
              {emailCheckComment}
            </p>
          </LabelInput>

          <LabelInput
            htmlFor="password"
            text="비밀번호"
            divStyle="xl:w-[60%] 3sm:w-full mx-auto mb-4"
            labelStyle="text-[0.9rem] font-bold"
          >
            <TypeInput
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              text={password}
              setText={setPassword}
              onChange={changePassword}
              divStyles="w-full mt-2"
              inputStyles="px-4 py-3 rounded-lg placeholder:text-[0.9rem]"
              deleteButtonStyle="md:w-8 3sm:w-6 md:h-8 3sm:h-6 md:top-2 3sm:top-3 right-3"
              styleType="auth"
            />
            <p
              className={`${isPasswordCheck} mt-2 text-[0.8rem] ${
                passwordValid || isPassword
                  ? "text-[#069144]"
                  : "text-[#ff0000]"
              }`}
            >
              {passwordCheckComment}
            </p>
          </LabelInput>

          <LabelInput
            htmlFor="confirm-password"
            text="비밀번호 확인"
            divStyle={`${
              signUp ? "block" : "hidden"
            } xl:w-[60%] 3sm:w-full mx-auto mb-4`}
            labelStyle="text-[0.9rem] font-bold"
          >
            <TypeInput
              id="confirm-password"
              type="password"
              placeholder="사용하실 비밀번호를 재입력해주세요."
              text={confirmPassword}
              setText={setConfirmPassword}
              onChange={changeConfirmPassword}
              divStyles="w-full mt-2"
              inputStyles="px-4 py-3 rounded-lg placeholder:text-[0.9rem]"
              deleteButtonStyle="md:w-8 3sm:w-6 md:h-8 3sm:h-6 md:top-2 3sm:top-3 right-3"
              styleType="auth"
            />
            <p
              className={`${
                signUp && confirmPassword?.length > 0 ? "block" : "hidden"
              } ${
                isPasswordConfirm ? "text-[#069144]" : "text-[#ff0000]"
              } text-[0.8rem]`}
            >
              {passwordConfirmMessage}
            </p>
          </LabelInput>

          <LabelInput
            htmlFor="nickname"
            text="닉네임"
            divStyle={`${
              signUp ? "block" : "hidden"
            } xl:w-[60%] 3sm:w-full mx-auto mb-4`}
            labelStyle="text-[0.9rem] font-bold"
          >
            <TypeInput
              id="nickname"
              type="text"
              placeholder="사용하실 닉네임을 입력해주세요."
              text={nickname}
              setText={setNickname}
              onChange={changeNickname}
              divStyles="w-full mt-2"
              inputStyles="px-4 py-3 rounded-lg placeholder:text-[0.9rem]"
              deleteButtonStyle="md:w-8 3sm:w-6 md:h-8 3sm:h-6 md:top-2 3sm:top-3 right-3"
              styleType="auth"
            />
            <p
              className={`${
                signUp && nickname?.length > 0 ? "block" : "hidden"
              } ${
                isNickname ? "text-[#069144]" : "text-[#ff0000]"
              } text-[0.8rem]`}
            >
              {nicknameMessage}
            </p>
          </LabelInput>

          <div className="xl:w-[60%] 3sm:w-full mx-auto mt-10">
            <Button
              value={signUp ? "회원가입" : "로그인"}
              onClick={signUp ? submitSignUp : submitLogin}
              isDisabled={signUp && signUpEnabled}
              styleType="redBg"
              styles={`${
                signUp && signUpEnabled ? "bg-[#9c9c9c]" : "bg-[#ff4273]"
              } w-full py-3 rounded-lg text-center font-bold transition-all duration-700`}
            />

            <div className={signUp ? "hidden" : "block"}>
              <div className="flex items-center justify-between w-full my-8 text-[0.875rem]">
                <div className="w-[44%] h-[0.5px] bg-[#a3a3a3]" />
                <p>또는</p>
                <div className="w-[44%] h-[0.5px] bg-[#a3a3a3]" />
              </div>

              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
