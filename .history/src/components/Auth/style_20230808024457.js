import styled from "styled-components";

// auth background
export const AuthBackground = styled.div`
  width: 100%;
  /* height: calc(100vh - 94px); */
  // 기존 헤더 heigth 78px 이나 스크롤을 없애는 데 16px 이 더 필요함 원인은 무엇인지
  padding-top: 128px;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  /* e3e3e3 */
`;

// auth wrapper
export const AuthWrapper = styled.div`
  background-color: #fff;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* border: 1px solid black; */

  @media (max-width: 560px) {
    width: 510px;
  }
  @media (max-width: 480px) {
    width: 430px;
  }
  @media (max-width: 400px) {
    width: 380px;
  }
`;

// auth logo
export const AuthLogoWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: -20px;

  @media (max-width: 560px) {
    width: 510px;
    margin-bottom: -30px;
  }
  @media (max-width: 480px) {
    width: 430px;
    margin-bottom: -40px;
  }
  @media (max-width: 400px) {
    width: 380px;
  }
`;
export const AuthLogo = styled.div`
  color: #6a24ff;

  @media (max-width: 560px) {
    width: 165px;
  }
  @media (max-width: 480px) {
    width: 125px;
  }
  /* @media (max-width: 400px) {
    width: 110px;
  } */
`;

// auth title - log in
export const LoginTitleTextWrapper = styled.div`
  height: 94px;

  margin: 30px 0;
  text-align: center;
  justify-content: center;

  @media (max-width: 560px) {
    width: 510px;
    margin: 20px 0;
  }
  @media (max-width: 480px) {
    width: 430px;
    margin: 5px 0;
  }
  /* @media (max-width: 400px) {
    width: 390px;
    margin: 5px 0;
  } */
`;
export const LoginTitleWrapper = styled.div`
  height: 61px;

  margin-bottom: -5px; //

  @media (max-width: 560px) {
    width: 510px;
    margin-bottom: -15px;
  }
  @media (max-width: 480px) {
    width: 430px;
    margin-bottom: -25px;
  }
`;
export const LoginTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #000000;

  @media (max-width: 560px) {
    font-size: 26px;
  }
  @media (max-width: 480px) {
    font-size: 22px;
  }
`;
export const AuthTextWrapper = styled.div`
  width: 560px;
  height: 33px;

  @media (max-width: 560px) {
    width: 510px;
  }
  @media (max-width: 480px) {
    width: 430px;
  }
`;
export const AuthText = styled.span`
  font-size: 18px;
  font-weight: medium;
  color: #505050;

  @media (max-width: 560px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;
export const LinkText = styled.span`
  color: #6a24ff;
  font-size: 18px;
  font-weight: medium;

  /* margin: 1rem 0.5rem 2rem; */

  @media (max-width: 560px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;
// auth title - sign up
export const SignUpTitleTextWrapper = styled.div`
  width: 560px;
  height: 119px;

  margin: 30px 0;
  text-align: center;
  justify-content: center;

  @media (max-width: 560px) {
    width: 510px;
    margin: 0;
  }
  @media (max-width: 480px) {
    width: 430px;
    margin: -30px 0;
  }
`;
export const SignnUpTitleWrapper = styled.div`
  width: 560px;
  height: 86px;

  text-align: center;
  justify-content: center;

  margin-bottom: -10px; //

  @media (max-width: 560px) {
    width: 510px;
    /* margin-bottom: -25px; */
    margin: 20px 0 -25px 0;
  }
  @media (max-width: 480px) {
    width: 430px;
    margin: 40px 0 -25px 0;
  }
`;
export const SignUpTitle = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #000000;

  @media (max-width: 560px) {
    font-size: 40px;
  }
  @media (max-width: 480px) {
    font-size: 34px;
  }
`;

// auth form
export const AuthLoginForm = styled.div`
  width: 420px;
  height: 338px;

  @media (max-width: 560px) {
    width: 370px;
  }
  @media (max-width: 480px) {
    width: 330px;
  }
`;
export const AuthSignUpForm = styled.div`
  width: 420px;
  height: 594px;

  @media (max-width: 560px) {
    width: 370px;
  }
  @media (max-width: 480px) {
    width: 330px;
  }
`;
export const AuthInputWrapper = styled.div`
  width: 420px;
  height: 119px;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap; // css 안먹어서 임시로 - 이거 하니까 왜 옆으로 안넘어가지
  /* box-sizing: border-box; */

  @media (max-width: 560px) {
    width: 370px;
    height: 109px;
  }
  @media (max-width: 480px) {
    width: 330px;
    height: 89px;
  }
`;
export const AuthLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #000000;

  margin-bottom: 10px; // css 안먹어서 임시로

  @media (max-width: 560px) {
    font-size: 14px;
    margin-bottom: 7px;
  }
  @media (max-width: 480px) {
    width: 330px;
    font-size: 12px;
    margin-bottom: 4px;
  }
`;
export const AuthInput = styled.input`
  width: 420px;
  height: 54px;
  font-size: 15px;
  /* font-weight:  */
  color: #a3a3a3;
  border: 1px solid #a3a3a3;
  border-radius: 10px;

  text-indent: 25px;

  &:focus {
    outline: none;
  }

  @media (max-width: 560px) {
    width: 370px;
    font-size: 14px;
    text-indent: 22px;
  }
  @media (max-width: 480px) {
    width: 330px;
    font-size: 13px;
    text-indent: 16px;
  }
`;
export const AuthButton = styled.button`
  width: 420px;
  height: 60px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #6a24ff;
  border: none;
  border-radius: 10px;

  cursor: pointer;

  margin-top: 15px; // css 안먹어서 임시로

  :disabled {
    background-color: #dadada;
    color: #fff;
  }

  @media (max-width: 560px) {
    width: 370px;
    height: 52px;
    font-size: 16px;
    margin: 12px 0 0 0;
  }
  @media (max-width: 480px) {
    width: 330px;
    height: 46px;
    font-size: 14px;
    margin: 9px 0 0 0;
  }
`;
export const AuthInputValidationWrapper = styled.div`
  width: 420px;
  height: 35px;
  font-size: 14px;
  color: #ff0000;

  margin-top: 5px; // 인풋창이 줄어들음.....................

  @media (max-width: 560px) {
    width: 370px;
    font-size: 13px;
    margin-top: 4px;
  }
  @media (max-width: 480px) {
    width: 330px;
    font-size: 12px;
    margin-top: 3px;
  }
`;
export const AuthInputValidationText = styled.p`
  .message {
    &.success {
      color: green;
    }
    &.error {
      color: #ff0000;
    }
  }
`;

export const BoundaryLineWrapper = styled.div`
  width: 414px;
  height: 20px;
  margin: 10px 0 30px 0; // css 안먹어서 임시로

  @media (max-width: 560px) {
    width: 364px;
    margin: -30px 0 24px 0;
  }
  @media (max-width: 480px) {
    width: 324px;
    margin: -70px 0 18px 0;
  }
`;
export const BoundaryLine = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #505050;

  display: block;
  text-align: center;
  position: relative;

  &::before {
    width: 179px;
    height: 1px;
    background-color: #ddd;
    position: absolute;
    left: 0;
    top: 8px;
    content: "";
  }

  &::after {
    width: 179px;
    height: 1px;
    background-color: #ddd;
    position: absolute;
    right: 0;
    top: 8px;
    content: "";
  }
  @media (max-width: 560px) {
    font-size: 13px;
    width: 370px;

    &::before {
      width: 160px;
      height: 1px;
      background-color: #ddd;
      position: absolute;
      left: 0;
      top: 6px;
      content: "";
    }

    &::after {
      width: 160px;
      height: 1px;
      background-color: #ddd;
      position: absolute;
      right: 0;
      top: 6px;
      content: "";
    }
  }
  @media (max-width: 480px) {
    font-size: 11px;
    width: 330px;

    &::before {
      width: 140px;
      height: 1px;
      background-color: #ddd;
      position: absolute;
      left: 0;
      top: 4px;
      content: "";
    }

    &::after {
      width: 140px;
      height: 1px;
      background-color: #ddd;
      position: absolute;
      right: 0;
      top: 4px;
      content: "";
    }
  }
`;

// social login form
export const SocialLoginForm = styled.div`
  width: 420px;

  /* margin: 20px 0; */

  @media (max-width: 560px) {
    width: 370px;
  }
  @media (max-width: 480px) {
    width: 330px;
  }
`;
// export const SocialLoginList = styled.div`
//   width: 419px;
//   /* height: 60px; */
// `;

export const SocialLoginItem = styled.div`
  width: 419px;
  height: 60px;

  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;

  @media (max-width: 560px) {
    width: 369px;
  }
  @media (max-width: 480px) {
    width: 329px;
  }
`;

export const GoogleImg = styled.img`
  width: 100%;
`;

// export const SocialLoginTitleWrapper = styled.div`
//   width: 414px;
//   height: 20px;
// `;

// export const NaverLoginItem = styled.li`
//   width: 4.5rem;
//   height: 4.5rem;
//   border-radius: 50%;

//   /* margin: 1rem 1.3rem; */
//   overflow: hidden;
//   cursor: pointer;
// `;

// export const SocialLoginLogo = styled.div`
//   /* display: block; */
// `;
// export const SocialLoginLogoImg = styled.img`
//   /* background-size: cover; */

//   max-width: 100%; // 이걸 하니까 맞춰지네???
// `;
