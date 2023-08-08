import {
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../api/firebase";
import { SocialLoginItem } from "./style";
import { FcGoogle } from "react-icons/fc";

export const GoogleLogin = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // 구글 로그인
  // 팝업을 띄우고 구글 계정으로 접근한다. 기존 가입 계정이 있다면 그대로 로그인, 없다면 자동으로 가입되어 로그인.
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    // setPersistence => 로그인 시 세션스토리지에 유저 정보 저장
    setPersistence(authService, browserSessionPersistence)
      .then(() => signInWithPopup(authService, provider))
      .then(() => {
        alert("환영합니다!");
        if (state) {
          navigate(state);
        } else {
          navigate("/main", { replace: true });
        }
      });
  };

  return (
    <SocialLoginItem onClick={handleGoogleLogin}>
      <div className="text-[2.4rem]">
        <FcGoogle />
      </div>
      <p className="ml-40 text-[1rem] font-semibold text-black">구글</p>
    </SocialLoginItem>
  );
};

{
  /* <SocialLoginItem
            onClick={() => {
              alert("아직은 안돼요~");
            }}
          >
            <SocialLoginLogo>
              <SocialLoginLogoImg
                src={require("../../assets/social-login-kakaotalk.png")}
              />
            </SocialLoginLogo>
          </SocialLoginItem>
          <SocialLoginItem
            onClick={() => {
              alert("아직은 안돼요~");
            }}
          >
            <SocialLoginLogo>
              <SocialLoginLogoImg
                src={require("../../assets/social-login-naver.png")}
              />
            </SocialLoginLogo>
          </SocialLoginItem> */
}
//  <NaverLogin />;
