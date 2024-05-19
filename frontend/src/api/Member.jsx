import axios from "axios";
const BASE_URL = "https://catale.silvstone.xyz/api/v1/member";
// https://api.silvstone.xyz/api/v1/member/preference

// 일반 회원가입
export async function signup(user) {
  try {
    const response = await axios.post(BASE_URL + "/signup", user);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 이메일 인증 요청
export async function checkEmail(email) {
  try {
    const response = await axios.post(BASE_URL + `/email/verification`, email);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//로그인
export async function login(user) {
  try {
    localStorage.clear();

    const response = await axios.post(BASE_URL + "/login", user);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//취향
export async function preference(taste) {
  try {
    const response = await axios.post(BASE_URL + "/preference", taste);
    return response.data;
  } catch (error) {
    throw error;
  }
}
//로그아웃
export async function logout() {
  try {
    await axios.post(BASE_URL + "/logout");
  } catch (error) {
    throw error;
  }
}

export async function check() {
  try {
    const response = await axios.get(
      "https://api.silvstone.xyz/api/v1/cocktail?page=0&size=10&sort=string"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

//비밀번호 변경
export async function changePassword(password) {
  try {
    const response = await axios.put(BASE_URL + `/password`, password);
    return response.data;
  } catch (error) {
    throw error;
  }
}
//닉네임 변경
export async function changeNickname(name) {
  try {
    const response = await axios.put(BASE_URL + `/name`, name);
    return response.data;
  } catch (error) {
    throw error;
  }
}
//프시 변경
export async function changeImg(img) {
  try {
    const response = await axios.put(
      `https://api.silvstone.xyz/api/v1/image/member/profileimage`,
      img
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

//이번달 내 기분
export async function mooddata(month) {
  try {
    const response = await axios.get(BASE_URL + `/mood`, { params: month });
    return response.data;
  } catch (error) {
    throw error;
  }
}

//회원가입시 유저가 좋아하는 칵테일 넘겨주기
export async function chooselist(cocktaillist) {
  try {
    const response = await axios.post(BASE_URL + "/choose", cocktaillist);
    return response.data;
  } catch (error) {
    throw error;
  }
}
