import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

// 이 과정을 Navbar 컴포넌트에서 바로 해줘도 되지만, 그렇게 되면 컴포넌트들이 firebase에 지나치게 의존하게 된다.
// 그렇기 때문에 firebase.js에서 구글 로그인 관련 함수를 작성해준다.
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
  // (error => console.error(error));와 동일.
}

export function logout() {
  signOut(auth).catch(console.error);
}

// 기존의 login 함수 =>
// export async function login() {
// return signInWithPopup(auth, provider)
//   .then((result) => {
//     const user = result.user;
//     console.log(user);
//     return user;
//   })
//   .catch(console.error);
// }

// 기존의 logout 함수 =>
// export async function logout() {
//   return signOut(auth).then(()=> null);
// }

// 그런데 then이 빠진 이유는,
// onUserStateChange 함수가 생겨 유저의 상태가 변경될 때마다 콜백함수(setUser)를 호출하기 때문이다.
// 로그인과 로그아웃을 하면 자동으로 안에 내장되어 있는 유저의 값이 생기거나 null이 될 텐데,
// 그렇게 유저의 상태가 변경될 때마다 유저를 인수로 받는 setUser 콜백함수가 자동으로 호출될 것이기 때문이다.
// 고로 signInWithPopup 함수가 실행 성공하면 user 변수에 유저 값을 저장해 그걸 setUser에 담아주는 등의 행동을 할 필요가 없다.

// logout 함수 역시 then을 생략할 수 있다.
// onUserStateChange 함수가 없을 때는 signOut 함수가 실행 성공하면 null을 리턴해줬는데,
// 이제는 null을 리턴해 setUser에 직접 담아줄 필요가 없어졌다.
// onUserStateChange 함수가 유저 값의 변화를 인지해 setUser에 인수로 유저를 담아줄 것이기 때문이다.

// NAvbar 컴포넌트 handleLogin 함수 =>
// const handleLogin = () => {
//   login().then(setUser);
//}

// NAvbar 컴포넌트 handleLogout 함수 =>
// const handleLogout = () => {
//   logout().then(setUser);
// }

// 자연스레 Navbar 컴포넌트에서 handleLogin, handleLogout 함수가 실행되면서
// login, logout 함수가 실행에 성공하면 setUser에 유저 값 또는 null을 담아주는 행위 역시 필요가 없어졌다.
// 이렇게 then을 생략하고 login, logout 함수만 호출하면 되게끔 바뀌었기 때문에 굳이 handleLogin, handleLogout 함수를 만들 필요가 없어졌다.

// 유저의 상태가 변경될 때마다 콜백함수를 호출한다.
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
