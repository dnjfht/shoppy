import axios from "axios";

// Cart 데이터를 가져올 때 사용
export async function loadCartServer(user) {
  const response = await axios.get(
    `https://birthday-party-shop-backend-server.vercel.app/cart/${user.uid}`
  );
  return response?.data?.cartData;
}

// Cart 데이터를 추가/수정할 때 사용
export async function setCartServer(user, cartData) {
  await axios.post(
    `https://birthday-party-shop-backend-server.vercel.app/cart/${user.uid}`,
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
