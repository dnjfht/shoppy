import { firebaseConfig } from "../api/firebase";

// Date.now()의 string을 현재 시간으로 변환하는 함수
export const timeToLocaleString = (createdAt) =>
  new Date(createdAt).toLocaleString();

// isLoggedIn 유틸화
export function isLoggedIn() {
  if (
    sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    )
  ) {
    return true;
  } else {
    return false;
  }
}
