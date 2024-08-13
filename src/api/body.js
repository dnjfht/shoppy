import axios from "axios";

// 체형 정보 가져오기
export const recieveBodyData = async (userId) => {
  const res = await axios.get(
    `https://birthday-party-shop-backend-server.vercel.app/body/${userId}`
  );
  return res;
};

// 체형 정보 등록하기
export const setMyBodyServer = async (
  myHeight,
  myWeight,
  mySize,
  myFootSize,
  userId
) => {
  await axios.post(
    `https://birthday-party-shop-backend-server.vercel.app/body/${userId}`,
    {
      data: {
        myHeight,
        myWeight,
        mySize,
        myFootSize,
      },
    }
  );
};
