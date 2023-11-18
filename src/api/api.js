import axios from "axios";

const API_URL = "https://birthday-party-shop-backend-server.vercel.app/";

// 리뷰 삭제 관련 함수
export const deleteReview = async (productId, detailUserId, reviewData) => {
  try {
    const res = await axios.post(
      `${API_URL}/review/${productId}/${detailUserId}`,
      reviewData
    );
    console.log(productId, detailUserId, res);
    return res.data;
  } catch (error) {
    throw error;
  }
};
