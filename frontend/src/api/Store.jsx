import axios from "axios";
const BASE_URL = "https://catale.silvstone.xyz/api/v1/store";

// 가게 리스트 전체 조회
export async function getstorelist() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 가게 상세 조회
export async function getstoredetail(storeId) {
  try {
    const response = await axios.get(BASE_URL + `/${storeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
