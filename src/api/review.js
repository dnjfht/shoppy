import axios from "axios";

// 리뷰 가져오기
export const recieveReviewData = async (productId) => {
  const resAll = await axios.get(
    `https://birthday-party-shop-backend-server.vercel.app/review/${productId}`
  );
  return resAll.data.filter((review) => review.reviewWeight != null);
};

// 리뷰 등록하기
export async function setReviewServer(
  user,
  phoneNumber,
  item,
  firestoreReviewData,
  reviewData
) {
  const response = await axios.post(
    `https://birthday-party-shop-backend-server.vercel.app/review/${item.id}/${
      user ? user.uid : phoneNumber
    }${
      firestoreReviewData.filter((data) =>
        user ? data.userId === user.uid : data.phoneNumber === phoneNumber
      ).length + 1
    }`,
    reviewData
  );
  return response;
}
