import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { isTokenExpired, renewToken } from "./api/common/Token";
import "./App.css";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return config;
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    localStorage.clear();
    window.location.href = "/login";
    //return Promise.reject(error);
  }
);

export default function App() {
  useEffect(() => {
    function setScreenHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    setScreenHeight();

    // resize 이벤트가 발생하면 다시 계산하도록 아래 코드 추가
    window.addEventListener("resize", setScreenHeight);
    return () => window.removeEventListener("resize", setScreenHeight);
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
