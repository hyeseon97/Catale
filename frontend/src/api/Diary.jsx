import axios from "axios";
const BASE_URL = "https://catale.silvstone.xyz/api/v1/diary";

// 월별 다이어리 조회
export async function monthdiary(year, month) {
  const params = {
    year: year,
    month: month + 1,
  };
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 다이어리 저장
export async function savadiary(today) {
  try {
    const response = await axios.post(BASE_URL, today);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//다이어리 상세조회
export async function detaildiary(id) {
  try {
    const response = await axios.get(BASE_URL + `/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//다이어리 삭제하기
export async function deletediary(id) {
  try {
    const response = await axios.delete(BASE_URL + `/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 오늘의 다이러리 유무 조회
export async function todaydiary() {
  try {
    const response = await axios.get(BASE_URL + `/today`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//오늘날짜의 칵테일 조회
export async function cocktailtoday(today) {
  try {
    const response = await axios.get(BASE_URL + "/date", { params: today });
    return response.data;
  } catch (error) {
    throw error;
  }
}
