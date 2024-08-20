import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  updateProfile,
} from "firebase/auth";
import { authService } from "../api/firebase";
import AuthForm from "../components/Auth/AuthForm";
import { isLoggedIn } from "../utils/utils";

const SignUpPage = () => {
  const navigate = useNavigate();

  // 유저 정보 가져오기 로그인 되어있으면 로그인 페이지 막기
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
  }, []);

  // 기존 sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
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

  // 회원가입
  const submitSignUp = () => {
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
      email={email}
      setEmail={setEmail}
      changeEmail={changeEmail}
      emailMessage={emailMessage} // sign up 실시간 유효성 검사
      isEmail={isEmail} // sign up 실시간 유효성 검사
      password={password}
      setPassword={setPassword}
      changePassword={changePassword}
      passwordMessage={passwordMessage} // sign up 실시간 유효성 검사
      isPassword={isPassword} // sign up 실시간 유효성 검사
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      changeConfirmPassword={changeConfirmPassword}
      passwordConfirmMessage={passwordConfirmMessage} // sign up 실시간 유효성 검사
      isPasswordConfirm={isPasswordConfirm} // sign up 실시간 유효성 검사
      nickname={nickname}
      setNickname={setNickname}
      changeNickname={changeNickname}
      nicknameMessage={nicknameMessage} // sign up 실시간 유효성 검사
      isNickname={isNickname} // sign up 실시간 유효성 검사
      submitSignUp={submitSignUp}
    />
  );
};

export default SignUpPage;
