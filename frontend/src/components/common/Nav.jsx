// 틀 컴포넌트
// 네브바 부분에 해당합니다.

import s from "classnames";
import styles from "./Nav.module.css";
import calA from "../../assets/icon/calA.png";
import calB from "../../assets/icon/calB.png";
import homeA from "../../assets/icon/homeA.png";
import homeB from "../../assets/icon/homeB.png";
import mapA from "../../assets/icon/mapA.png";
import mapB from "../../assets/icon/mapB.png";
import searchA from "../../assets/icon/searchA.png";
import searchB from "../../assets/icon/searchB.png";
import userA from "../../assets/icon/userA.png";
import userB from "../../assets/icon/userB.png";
import { useNavigate } from "react-router-dom";

function Nav({ num }) {
  const navigate = useNavigate();
  return (
    <div className={s(styles.nav)}>
      <img
        src={num === 1 ? searchB : searchA}
        alt="search_icon"
        onClick={() => navigate("/search")}
      />
      <img
        src={num === 2 ? mapB : mapA}
        alt="map_icon"
        onClick={() => navigate("/map")}
      />
      <img
        src={num === 3 ? homeB : homeA}
        alt="home_icon"
        onClick={() => navigate("/bar")}
      />
      <img
        src={num === 4 ? calB : calA}
        alt="calendar_icon"
        onClick={() => navigate(`/diary`)}
      />
      <img
        src={num === 5 ? userB : userA}
        alt="user_icon"
        onClick={() => navigate("/my")}
      />
    </div>
  );
}

export default Nav;
