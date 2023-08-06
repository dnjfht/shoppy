import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const db = getFirestore(app);

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

/**
 * @param {string} collection
 * @param {string} key
 * @param {Record<string, string | number>} value
 */
export async function setFirestoreData(collection, key, value) {
  const docRef = db.collection(collection).doc(key);
  await docRef.set(value);
}

export async function getFirestoreData(collection, key, value) {
  // To be implement!
}
