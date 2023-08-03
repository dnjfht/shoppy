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

// 유저의 상태가 변경될 때마다 콜백함수를 호출한다.
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
