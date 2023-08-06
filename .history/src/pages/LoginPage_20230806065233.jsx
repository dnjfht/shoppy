import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import { authService } from "../api/firebase";
import { isLoggedIn } from "../utils/utils";

const LoginPage = () => {
  console.log(userInfo);
  // 유저 정보 가져오기 로그인 되어있으면 로그인 페이지 막기

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn() ? navigate("/mypage") : navigate("/login");
  }, []);

  const { state } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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

  // 이메일, 비밀번호 유효성 검사
  // const checkValidation = () => {
  //   const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  //   const passwordRegex =
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  //   const checkEmailValidation = email.match(emailRegex);
  //   const checkPasswordValidation = password.match(passwordRegex);

  //   if (!email || !checkEmailValidation) {
  //     if (!email) {
  //       alert("이메일을 입력해주세요.");
  //       emailRef?.current?.focus();
  //       return false;
  //     } else {
  //       alert("이메일 형식을 올바르게 입력해주세요.");
  //       emailRef?.current?.focus();
  //       return false;
  //     }
  //   }

  //   if (!password || !checkPasswordValidation) {
  //     if (!password) {
  //       alert("비밀번호를 입력해주세요.");
  //       passwordRef?.current?.focus();
  //       return false;
  //     } else {
  //       alert(
  //         "비밀번호는 대소문자, 특수문자를 포함하여 8자리 이상 입력해주세요."
  //       );
  //       passwordRef?.current?.focus();
  //       setPassword("");
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  // 로그인
  const submitLogin = () => {
    // 이메일, 비밀번호 유효성 검사 확인
    // if (!checkValidation()) return;

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
          navigate("/main", { replace: true });
        }
      })
      .catch((err) => {
        if (err.message.includes("user-not-found")) {
          alert("가입 정보가 없습니다. 회원가입을 먼저 진행해 주세요.");
          navigate("/signup", { state });
          emailRef?.current?.focus();
          setEmail("");
          setPassword("");
        }

        if (err.message.includes("wrong-password")) {
          alert("잘못된 비밀번호 입니다.");
          passwordRef?.current?.focus();
          setPassword("");
        }
      });
  };

  return (
    <AuthForm
      title="초년생을 위한 예적금 비교, 팁퍼"
      text="아직 회원이 아니신가요? "
      linkText="회원가입하기"
      email={email}
      changeEmail={changeEmail}
      emailRef={emailRef}
      emailValid={emailValid} // login 실시간 유효성 검사
      password={password}
      changePassword={changePassword}
      passwordRef={passwordRef}
      passwordValid={passwordValid} // login 실시간 유효성 검사
      // socialBtn={socialBtn}
      submitLogin={submitLogin}
    />
  );
};

export default LoginPage;
