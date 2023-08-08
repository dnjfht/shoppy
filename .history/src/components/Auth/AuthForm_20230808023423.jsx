import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "./GoogleLogin";
import { KakaoLogin } from "./KakaoLogin";
import { NaverLogin } from "./NaverLogin";
import {
  AuthBackground,
  AuthButton,
  AuthInput,
  AuthInputWrapper,
  AuthLabel,
  AuthLogo,
  AuthLogoImg,
  AuthText,
  LinkText,
  AuthTitle,
  AuthWrapper,
  DefaultLoginForm,
  SocialLoginForm,
  SoclaiLoginItem,
  SocialLoginTitle,
  SocialLoginList,
  AuthLogoText,
  AuthLogoWrapper,
  AuthTitleWrapper,
  AuthTextWrapper,
  AuthTitleTextWrapper,
  AuthInputValidationText,
  AuthSignUpForm,
  AuthLoginForm,
  SocialLoginTitleWrapper,
  BoundaryLineWrapper,
  BoundaryLine,
  SocialLoginItem,
  AuthInputValidationTextWrapper,
  AuthInputValidationWrapper,
  LoginTitleTextWrapper,
  LoginTextWrapper,
  LoginTitleWrapper,
  LoginTitle,
  SignnUpTitleTextWrapper,
  SignnUpTitleWrapper,
  SignUpTitle,
  SignUpTitleTextWrapper,
} from "./style";

const AuthForm = ({
  title,
  text,
  linkText,
  email,
  changeEmail,
  emailRef,
  emailValid, // login 실시간 유효성 검사
  emailMessage, // sign up 실시간 유효성 검사
  isEmail, // sign up 실시간 유효성 검사
  password,
  changePassword,
  passwordRef,
  passwordValid, // login 실시간 유효성 검사
  passwordMessage, // sign up 실시간 유효성 검사
  isPassword, // sign up 실시간 유효성 검사
  confirmPassword,
  changeConfirmPassword,
  confirmPasswordRef,
  passwordConfirmMessage, // sign up 실시간 유효성 검사
  isPasswordConfirm, // sign up 실시간 유효성 검사
  nickname,
  changeNickname,
  nicknameRef,
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

  return (
    <AuthBackground>
      <AuthWrapper>
        {signUp ? (
          <>
            <SignUpTitleTextWrapper>
              <SignnUpTitleWrapper>
                <SignUpTitle>{title}</SignUpTitle>
              </SignnUpTitleWrapper>

              <AuthTextWrapper>
                <AuthText>
                  {text}
                  {/* <Link to={`${signUp ? "/login" : "/signup"}`}> */}
                  <Link style={{ textDecoration: "none" }} to="/login">
                    <LinkText>{linkText}</LinkText>
                  </Link>
                </AuthText>
              </AuthTextWrapper>
            </SignUpTitleTextWrapper>
          </>
        ) : (
          <>
            <AuthLogoWrapper>
              <AuthLogo>
                <Link to="/" className="flex">
                  <img
                    src={process.env.PUBLIC_URL + `/image/logo.png`}
                    alt="logo_img"
                  />
                  <p className="font-[InkLipquid] text-black text-[3rem]">
                    Birthday Party
                  </p>
                </Link>
              </AuthLogo>
            </AuthLogoWrapper>

            <LoginTitleTextWrapper>
              <LoginTitleWrapper>
                <LoginTitle>{title}</LoginTitle>
              </LoginTitleWrapper>

              <AuthTextWrapper>
                <AuthText>
                  {text}
                  {/* <Link to={`${signUp ? "/login" : "/signup"}`}> */}
                  <Link style={{ textDecoration: "none" }} to="/signup">
                    <LinkText>{linkText}</LinkText>
                  </Link>
                </AuthText>
              </AuthTextWrapper>
            </LoginTitleTextWrapper>
          </>
        )}

        {signUp ? (
          <AuthSignUpForm>
            <AuthInputWrapper>
              <AuthLabel>이메일</AuthLabel>
              <AuthInput
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={changeEmail}
                ref={emailRef}
              />
              <AuthInputValidationWrapper>
                <AuthInputValidationText>
                  {email.length > 0 && (
                    <span
                      className={`message ${isEmail ? "success" : "error"}`}
                    >
                      {emailMessage}
                    </span>
                  )}
                </AuthInputValidationText>
              </AuthInputValidationWrapper>
            </AuthInputWrapper>

            <AuthInputWrapper>
              <AuthLabel>비밀번호</AuthLabel>
              <AuthInput
                id="password"
                type="password"
                placeholder="사용하실 비밀번호를 입력해주세요."
                value={password}
                onChange={changePassword}
                ref={passwordRef}
              />
              <AuthInputValidationWrapper>
                <AuthInputValidationText>
                  {password.length > 0 && (
                    <span
                      className={`message ${isPassword ? "success" : "error"}`}
                    >
                      {passwordMessage}
                    </span>
                  )}
                </AuthInputValidationText>
              </AuthInputValidationWrapper>
            </AuthInputWrapper>

            <AuthInputWrapper>
              <AuthLabel>비밀번호 확인</AuthLabel>
              <AuthInput
                id="confirm-password"
                type="password"
                placeholder="사용하실 비밀번호를 재입력해주세요."
                value={confirmPassword}
                onChange={changeConfirmPassword}
                ref={confirmPasswordRef}
              />
              <AuthInputValidationWrapper>
                <AuthInputValidationText>
                  {confirmPassword.length > 0 && (
                    <span
                      className={`message ${
                        isPasswordConfirm ? "success" : "error"
                      }`}
                    >
                      {passwordConfirmMessage}
                    </span>
                  )}
                </AuthInputValidationText>
              </AuthInputValidationWrapper>
            </AuthInputWrapper>

            <AuthInputWrapper>
              <AuthLabel>닉네임</AuthLabel>
              <AuthInput
                id="nickname"
                type="text"
                placeholder="사용하실 닉네임을 입력해주세요."
                maxLength={6}
                value={nickname}
                onChange={changeNickname}
                ref={nicknameRef}
              />
              <AuthInputValidationWrapper>
                <AuthInputValidationText>
                  {nickname.length > 0 && (
                    <span
                      className={`message ${isNickname ? "success" : "error"}`}
                    >
                      {nicknameMessage}
                    </span>
                  )}
                </AuthInputValidationText>
              </AuthInputValidationWrapper>
            </AuthInputWrapper>
            <AuthButton disabled={signUpEnabled} onClick={submitSignUp}>
              회원가입
            </AuthButton>
          </AuthSignUpForm>
        ) : (
          <AuthLoginForm>
            <AuthInputWrapper>
              <AuthLabel>이메일</AuthLabel>
              <AuthInput
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={changeEmail}
                ref={emailRef}
              />
              <AuthInputValidationWrapper>
                {!emailValid && email.length > 0 && (
                  <AuthInputValidationText>
                    이메일을 확인해주세요.
                  </AuthInputValidationText>
                )}
              </AuthInputValidationWrapper>
            </AuthInputWrapper>

            <AuthInputWrapper>
              <AuthLabel>비밀번호</AuthLabel>
              <AuthInput
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={changePassword}
                ref={passwordRef}
              />
              <AuthInputValidationWrapper>
                {!passwordValid && password.length > 0 && (
                  <AuthInputValidationText>
                    비밀번호를 확인해주세요.
                  </AuthInputValidationText>
                )}
              </AuthInputValidationWrapper>
            </AuthInputWrapper>
            <AuthButton onClick={submitLogin}>로그인</AuthButton>
          </AuthLoginForm>
        )}

        {!signUp && (
          <>
            <BoundaryLineWrapper>
              <BoundaryLine>또는</BoundaryLine>
            </BoundaryLineWrapper>
            <SocialLoginForm>
              <GoogleLogin />
            </SocialLoginForm>
          </>
        )}
      </AuthWrapper>
    </AuthBackground>
  );
};

export default AuthForm;
