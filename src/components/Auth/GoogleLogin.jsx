import {
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../api/firebase";
import Button from "../button/Button";

import { FcGoogle } from "react-icons/fc";

export const GoogleLogin = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // 구글 로그인
  // 팝업을 띄우고 구글 계정으로 접근. 기존 가입 계정이 있다면 그대로 로그인, 없다면 자동으로 가입되어 로그인.
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
    <Button
      icon={<FcGoogle />}
      onClick={handleGoogleLogin}
      styleType="grayBorder"
      styles="w-full py-3 rounded-lg flex items-center justify-center gap-x-2 text-[2rem]"
    >
      <p className="text-[1rem] font-semibold text-black">구글</p>
    </Button>
  );
};
