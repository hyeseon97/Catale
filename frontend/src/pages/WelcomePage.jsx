import React, { useEffect, useState } from "react";
import Container from "../components/common/Container";
import styles from "./WelcomePage.module.css";
import 웰컴 from "../assets/common/웰컴.png";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // 로컬 스토리지에 accesstoken이 있으면 /bar 페이지로 이동
      navigate("/bar");
    }
  }, [navigate]);

  return (
    <Container>
      <div className={styles.container}>
        {!show && (
          <div className={styles.전체안내창}>
            <div className={styles.안내창}>
              <div>본 사이트는 모바일 화면에 최적화 되어있습니다.</div>
              <div>사파리 혹은 크롬 접속 후</div>
              <div>'홈화면에 추가하기'</div>
              <div>버튼을 눌러 홈화면에서 접속하신 뒤</div>
              <div>쾌적하게 사용해주세요.</div>
              <br />
              사이트 주소
              <br />
              <br />
              <div>silvstone.xyz </div>
              <div className={styles.확인} onClick={() => setShow(true)}>
                확인
              </div>
            </div>
          </div>
        )}
        <div className={styles.로고}>
          <img className={styles.웰컴} src={웰컴} alt="" />
        </div>
        <div className={styles.웰컴하단}>
          <div className={styles.로그인} onClick={() => navigate("login")}>
            로그인
          </div>
          <div className={styles.회원가입} onClick={() => navigate("signup")}>
            회원가입
          </div>
        </div>
        <div className={styles.버전}>version-1.04</div>
      </div>
    </Container>
  );
}
