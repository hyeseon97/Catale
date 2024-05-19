// 틀 컴포넌트
// 네모상자에 해당합니다.

import s from "classnames";
import styles from "./Box.module.css";
function Box({ children, color }) {
  return <div className={s(color ? styles.box2 : styles.box)}>{children}</div>;
}

export default Box;
