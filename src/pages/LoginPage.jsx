import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import { authService } from "../api/firebase";
import { isLoggedIn } from "../utils/utils";

const LoginPage = () => {
  // 유저 정보 가져오기. 로그인 되어있으면 로그인 페이지 막기

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn() ? navigate("/mypage") : navigate("/login");
  }, []);

  const { state } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 실시간 유효성 검사
  // 이메일, 패스워드 유효성 값 초기화
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  // 이메일 입력 - 실시간 유효성 검사로 변환
  const changeEmail = (event) => {
    setEmail(event.target.value);
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (emailRegex.test(event.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  // 비밀번호 입력 - 실시간 유효성 검사로 변환
  const changePassword = (event) => {
    setPassword(event.target.value);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (passwordRegex.test(event.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  // 로그인
  const submitLogin = () => {
    // setPersistence => 세션스토리지에 유저 정보 저장
    setPersistence(authService, browserSessionPersistence)
      .then(() => signInWithEmailAndPassword(authService, email, password))
      .then(() => {
        alert("환영합니다!");
        setEmail("");
        setPassword("");

        if (state) {
          navigate(state);
        } else {
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        if (err.message.includes("user-not-found")) {
          alert("가입 정보가 없습니다. 회원가입을 먼저 진행해 주세요.");
          navigate("/signup", { state });
          setEmail("");
          setPassword("");
        }

        if (err.message.includes("wrong-password")) {
          alert("잘못된 비밀번호 입니다.");
          setPassword("");
        }
      });
  };

  return (
    <AuthForm
      email={email}
      setEmail={setEmail}
      changeEmail={changeEmail}
      emailValid={emailValid} // login 실시간 유효성 검사
      password={password}
      setPassword={setPassword}
      changePassword={changePassword}
      passwordValid={passwordValid} // login 실시간 유효성 검사
      submitLogin={submitLogin}
    />
  );
};

export default LoginPage;
