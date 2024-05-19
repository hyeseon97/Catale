// 뒤로 갈수 있는 헤더

import styles from "./Headerwb.module.css";
import back from "../../assets/common/arrow1.png";
import { useNavigate } from "react-router-dom";

function Headerwb({ children, title }) {
  const navigate = useNavigate();
  return (
    <div className={styles.부모요소}>
      <div className={styles.header}>
        <div className={styles.left}>
          <img src={back} alt="back_icon" onClick={() => navigate(-1)} />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.right}>{children}</div>
      </div>
    </div>
  );
}

export default Headerwb;
