// 틀 컴포넌트
// 팝업

import s from "classnames";
import arrow from "../../assets/common/arrow3.png";
import styles from "./Popup.module.css";
import { useNavigate } from "react-router-dom";
export default function Popup({ img, subText, text, src }) {
  const navigate = useNavigate();
  return (
    <div className={styles.box} onClick={() => navigate(`${src}`)}>
      <div className={styles.icon_box}>
        <img src={img} alt="img" className={styles.img} />
      </div>
      <div className={styles.text_box}>
        <div className={styles.sub_text}>{subText}</div>
        <div className={styles.text}>{text}</div>
      </div>
      <div className={styles.arrow_box}>
        <img src={arrow} alt="arrow" className={styles.arrow} />
      </div>
    </div>
  );
}
