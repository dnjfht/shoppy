// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import reactQuerystring from "react-querystring";
// import { SocialLoginItem, SocialLoginLogo, SocialLoginLogoImg } from "./style";

// export const KakaoLogin = () => {
//   const location = useLocation();
//   const REST_API_KEY = "bebc65f50010720c5a207eb9d7bb63c2"; // 카카오 디벨로퍼 -> 내 애플리케이션
//   const REDIRECT_URI = "http://localhost:3000/"; // callback 받을 주소
//   const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`; // 클릭 시 실행될 링크
//   const CLIENT_SECRET = "EuVTUhW5Ri3hXPfJdnFXonADAi3fcNsV"; // 카카오 로그인 -> 보안
//   const KAKAO_CODE = location.search.split("=")[1]; // 주소창의 파라미터(코드 값)

//   const [nickName, setNickName] = useState();
//   const [profileImage, setProfileImage] = useState();
//   const [accessToken, setAccessToken] = useState();

//   // 로그인
//   const handleKakaoLogin = () => {
//     window.location.replace(link);
//   };

//   //   const code = new URL(window.location.href).searchParams.get("code"); // 로그인 완료 -> 주소창의 파라미터(코드 값) 가져오는 함수
//   //   console.log(code);

//   //   // access token 요청하기
//   //   const getUser = async () => {
//   //     const ACCESS_TOKEN = await fetch("https://kauth.kakao.com/oauth/token", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//   //       },
//   //       // 액세스 토큰을 요청하기 위해 필요한 친구들
//   //       body: reactQuerystring.stringify({
//   //         grant_type: "authorization_code",
//   //         client_id: REST_API_KEY, // 상단 변수 지정
//   //         redirect_uri: REDIRECT_URI, // 상단 변수 지정
//   //         code: KAKAO_CODE, // 상단 변수 지정
//   //         client_secret: CLIENT_SECRET, // 상단 변수 지정
//   //       }),
//   //     })
//   //       .then((res) => res.json())
//   //       .catch((error) => console.log("error:", error));

//   //     console.log("ACCESS_TOKEN1", ACCESS_TOKEN);
//   //     setAccessToken(ACCESS_TOKEN.access_token); // state 에 access token을 넣어주기
//   //     console.log("ACCESS_TOKEN2", ACCESS_TOKEN.access_token);

//   //     localStorage.setItem("token_for_kakaotalk", ACCESS_TOKEN.access_token); // local storage에 잘들어가는지 확인

//   //     //kakao user DATA를 get해오기
//   //     const user = await axios.get("https://kapi.kakao.com/v2/user/me", {
//   //       headers: {
//   //         //access_token이 필요하다
//   //         Authorization: `Bearer ${ACCESS_TOKEN.access_token}`,
//   //       },
//   //     });

//   //     console.log(user); // 값을가져오면 state에 닉네임과 프로필이미지를 string 으로 담아주기
//   //     setNickName(user.data.properties.nickname);
//   //     setProfileImage(user.data.properties.profile_image);
//   //   };
//   //   console.log(nickName, profileImage);

//   //   useEffect(() => {
//   //     getUser();
//   //   }, []);

//   //   // 로그아웃
//   //   const handleKakaoLogout = async () => {
//   //     const islogout = await fetch("https://kapi.kakao.com/v1/user/logout", {
//   //       headers: {
//   //         // accessToken 만료시키기
//   //         Authorization: `Bearer ${accessToken}`,
//   //         "Content-Type": "application/x-www-form-urlencoded",
//   //       },
//   //       method: "POST",
//   //     }).then((res) => res.json());

//   //     localStorage.clear(); // local storage 에 넣어주었던 값 clear
//   //     console.log("isLogout", islogout);
//   //   };

//   //   // 토큰의 유효성 검사 (토큰이 유효한지 검사를 꼭 해보고 배포할 것) 남은 시간 및 고유 id 값 출력
//   //   const cheak = async () => {
//   //     const cheaktoken = await fetch(
//   //       "https://kapi.kakao.com/v1/user/access_token_info",
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${accessToken}`,
//   //         },
//   //       }
//   //     ).then((res) => res.json());
//   //     console.log("cheaktoken", cheaktoken);
//   //   };

//   return (
//     <SocialLoginItem onClick={handleKakaoLogin}>
//       <SocialLoginLogo>
//         <SocialLoginLogoImg
//           src={require("../../assets/social-login-kakao.png")}
//         />
//       </SocialLoginLogo>
//     </SocialLoginItem>
//   );
// };

// //   <button type="button" onClick={handleKakaoLogout}>
// //     로그아웃하기
// //   </button>
// //   <button type="button" onClick={cheak}>
// //     토큰상태확인
// //   </button>
