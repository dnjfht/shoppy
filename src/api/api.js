import axios from "axios";

const API_URL = "http://localhost:3001";

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
