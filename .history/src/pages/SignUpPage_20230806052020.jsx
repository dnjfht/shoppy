import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import { authService } from "../api/firebase";
import { isLoggedIn } from "../../utils/utils";

const SignUpPage = () => {
  // 유저 정보 가져오기 로그인 되어있으면 로그인 페이지 막기
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn() ? navigate("/") : navigate("/signup");
  }, []);

  // 회원가입 페이지 새로고침 제어
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = ""; // Chrome에서 동작하도록
  };
  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []); // 의존성 배열 내에 어떤 state 를 넣어야 하는지?

  // useEffect(() => {
  //   (() => {
  //     // window.history.pushState(null, "", window.location.href);
  //     window.addEventListener("popstate", preventGoBack);
  //     window.addEventListener("beforeunload", preventClose);
  //   })();

  //   return () => {
  //     // window.removeEventListener("popstate", preventGoBack);
  //     window.removeEventListener("beforeunload", preventClose);
  //   };
  // }, []);
  // 기존 sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const nicknameRef = useRef(null);

  // *** 실시간 유효성 검사 ***
  // *** 오류메세지 상태 저장 ***
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [nicknameMessage, setNickameMessage] = useState("");
  // *** 유효성 검사 ***
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isNickname, setIsNickame] = useState(false);
  // *** 회원가입 버튼 활성화 ***
  // const [signUpEnabled, setSignUpEnabled] = useState(true);
  // 이메일 입력 - 실시간 유효성 검사로 변환
  const changeEmail = (event) => {
    setEmail(event.target.value);
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(event.target.value)) {
      setEmailMessage("이메일 형식을 확인해주세요");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 형식입니다.");
      setIsEmail(true);
    }
  };
  // 비밀번호 입력 - 실시간 유효성 검사로 변환
  const changePassword = (event) => {
    setPassword(event.target.value);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(event.target.value)) {
      setPasswordMessage(
        "대소문자, 특수문자를 포함하여 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("사용 가능한 비밀번호 형식입니다.");
      setIsPassword(true);
    }
  };
  // 비밀번호 재입력 - 실시간 유효성 검사로 변환
  const changeConfirmPassword = (event) => {
    const currentPasswordConfirm = event.target.value;
    setConfirmPassword(currentPasswordConfirm);
    if (password === currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    }
  };
  // 닉네임 입력 - 실시간 유효성 검사로 변환
  const changeNickname = (event) => {
    const currentNickname = event.target.value;
    setNickname(currentNickname);
    if (currentNickname.length < 2 || currentNickname > 6) {
      setNickameMessage("닉네임은 2글자 이상, 6글자 미만으로 입력해주세요.");
      setIsNickame(false);
    } else {
      setNickameMessage("사용 가능한 닉네임입니다.");
      setIsNickame(true);
    }
  };

  // 이메일, 비밀번호, 닉네임 유효성 검사
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
  //   if (!confirmPassword) {
  //     alert("비밀번호를 한번 더 입력해주세요.");
  //     confirmPasswordRef?.current?.focus();
  //     return false;
  //   }
  //   if (password !== confirmPassword) {
  //     alert("비밀번호가 일치하지 않습니다.");
  //     confirmPasswordRef?.current?.focus();
  //     // setPassword("");
  //     setConfirmPassword("");
  //     return false;
  //   }

  //   if (!nickname || nickname.length < 2 || nickname.length > 6) {
  //     if (!nickname) {
  //       alert("닉네임을 입력해주세요.");
  //       nicknameRef?.current?.focus();
  //       return false;
  //     } else {
  //       alert("닉네임은 2글자 이상, 6글자 미만으로 입력해주세요.");
  //       nicknameRef?.current?.focus();
  //       return false;
  //     }
  //   }

  //   return true;
  // };

  // // 비밀번호 일치 여부 -> 닉네임 추가로 변수 없애고 상단으로 이동
  // const checkValidationForSignUp = () => {
  //   if (!confirmPassword) {
  //     alert("비밀번호를 다시 한번 더 입력해주세요.");
  //     return false;
  //   }
  //   if (password !== confirmPassword) {
  //     alert("비밀번호가 일치하지 않습니다.");
  //     confirmPasswordRef?.current?.focus();
  //     // setPassword("");
  //     setConfirmPassword("");
  //     return false;
  //   }
  //   return true;
  // };

  // 회원가입
  const submitSignUp = () => {
    // 이메일, 비밀번호, 닉네임 유효성 검사 확인
    // if (!checkValidation()) return;

    // // 비밀번호 일치여부 확인 -> 닉네임 추가로 변수 없애고 상단으로 이동
    // if (!checkValidationForSignUp()) return;

    // setPersistence => 세션스토리지에 유저 정보 저장
    setPersistence(authService, browserSessionPersistence) // 로컬 (세션, 토큰)
      .then(() => createUserWithEmailAndPassword(authService, email, password))
      .then(() => {
        if (authService.currentUser) {
          updateProfile(authService?.currentUser, {
            displayName: nickname,
          });
        }
      })
      .then(() => {
        alert("회원가입이 완료 되었습니다.");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setNickname("");
        navigate("/main");
      })
      .catch((err) => {
        if (err.message.includes("already-in-use")) {
          alert("이미 가입된 계정입니다.");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setNickname("");
          navigate("/login");
        }
      });
  };

  return (
    <AuthForm
      title="회원가입"
      text="이미 회원이신가요? "
      linkText="로그인하기"
      email={email}
      changeEmail={changeEmail}
      emailRef={emailRef}
      emailMessage={emailMessage} // sign up 실시간 유효성 검사
      isEmail={isEmail} // sign up 실시간 유효성 검사
      password={password}
      changePassword={changePassword}
      passwordRef={passwordRef}
      passwordMessage={passwordMessage} // sign up 실시간 유효성 검사
      isPassword={isPassword} // sign up 실시간 유효성 검사
      confirmPassword={confirmPassword}
      changeConfirmPassword={changeConfirmPassword}
      confirmPasswordRef={confirmPasswordRef}
      passwordConfirmMessage={passwordConfirmMessage} // sign up 실시간 유효성 검사
      isPasswordConfirm={isPasswordConfirm} // sign up 실시간 유효성 검사
      nickname={nickname}
      changeNickname={changeNickname}
      nicknameRef={nicknameRef}
      nicknameMessage={nicknameMessage} // sign up 실시간 유효성 검사
      isNickname={isNickname} // sign up 실시간 유효성 검사
      submitSignUp={submitSignUp}
    />
  );
};

export default SignUpPage;
