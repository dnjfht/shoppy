// import React, { useEffect, useRef, useState } from "react";
// import {
//   NaverLoginItem,
//   SocialLoginItem,
//   SocialLoginLogo,
//   SocialLoginLogoImg,
// } from "./style";

// export const NaverLogin = () => {
//   const [userName, setUserName] = useState("");
//   const { naver } = window;
//   const naverRef = useRef();
//   const NAVER_CLINET_ID = "SL33yOAE9rFsFYmLThxX";
//   const NAVER_CALLBACK_URL = "http://localhost:3000/";

//   const initializeNaverLogin = () => {
//     const naverLogin = new naver.LoginWithNaverId({
//       clientId: NAVER_CLINET_ID,
//       callbackUrl: NAVER_CALLBACK_URL,
//       isPopUp: false, // pop-up login
//       loginButton: { color: "green", type: 1, height: 70 }, // button type
//       callbackHandle: true,
//     });
//     naverLogin.init();
//     // 1. 선언된 naverLogin 을 이용하여 사용자 정보를 불러오는데, 함수 내부에서 naverLogin 을 선언하여 지역변수 처리가 되므로 userinfo 정보를 추출하는 것은 지역변수와 같은 함수에서 진행해야 함.

//     naverLogin.getLoginStatus(async function (status) {
//       if (status) {
//         const userid = naverLogin.user.getEmail();
//         const username = naverLogin.user.getName();
//         setUserName(username);
//       }
//     });
//     // 2. 이처럼 로그인한 사용자 정보를 직접 접근하여 추출 가능함. 이 때, 데이터는 첫 연동 시 동의한 데이터만 추출 가능함.
//     // 정보 전체를 state 에 저장하여 추출 -> 사용. ex) setUserInfo(naverLogin.user);
//   };

//   const userAccessToken = () => {
//     window.location.href.includes("access_token") && getToken();
//   };
//   // 3. 네이버 소셜 로그인은 URL 에 액세스 토큰이 붙어서 전달됨. 위의 형태로 토큰을 추출.

//   const getToken = () => {
//     const token = window.location.href.split("=")[1].split("&")[0];
//     // console.log("token", token);
//   };

//   // 4. console.log(), alert() 를 통해 토큰이 추출 되는지 확인할 것. 되었다면 이후 local storage 나 state 에 저장하여 사용.
//   // localStorage.setItem('access_token', token)
//   // setGetToken(token)

//   useEffect(() => {
//     initializeNaverLogin();
//     userAccessToken();
//   }, []);

//   // 로그인
//   const handleNaverLogin = () => {
//     naverRef.current.children[0].click();
//   };
//   return (
//     <div id="naverIdLogin" ref={naverRef}>
//       <NaverLoginItem onClick={handleNaverLogin}>
//         <SocialLoginLogo>
//           <SocialLoginLogoImg
//             src={require("../../assets/social-login-naver.png")}
//           />
//         </SocialLoginLogo>
//       </NaverLoginItem>
//     </div>
//   );
// };
