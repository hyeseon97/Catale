import axios from "axios";
const BASE_URL = "https://catale.silvstone.xyz/api/v1/review";

// 칵테일 리뷰 작성
export async function writereview(review) {
  try {
    const response = await axios.post(BASE_URL, review);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 칵테일별 리뷰 전체 조회
export async function getreview(id) {
  const params = {
    page: 0,
    size: 100,
  };

  try {
    const response = await axios.get(BASE_URL + `/${id}`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//리뷰 삭제하기
export async function deletereview(id) {
  try {
    const response = await axios.delete(BASE_URL + `/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
