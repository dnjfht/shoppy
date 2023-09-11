import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);

// const userInfo = JSON.parse(
//   sessionStorage.getItem(
//     "firebase:authUser:AIzaSyBuSJcIvQdMItFfKi8IchzBpWfqY9YUDFE:[DEFAULT]"
//   )
// );

// uid 값에 접근하기
// const uid = userInfo.uid;

// uid를 출력하거나 다른 작업에 활용할 수 있습니다.
// console.log(uid);

export function onUserStateChange(callback) {
  onAuthStateChanged(authService, (user) => {
    callback(user);
  });
}

// 데이터를 추가할때 사용
export async function loadCartServer(user) {
  const response = await axios.get(`http://localhost:3001/cart/${user.uid}`);
  return response?.data?.cartData;
}

// 데이터를 수정할 때 사용
export async function setCartServer(user, cartData) {
  await axios.post(
    `http://localhost:3001/cart/${user.uid}`,
    {
      data: {
        cartData,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
