// 틀 컴포넌트
// 컨테이너에 해당합니다.

import s from "classnames";
import styles from "./Container.module.css";

function Container({ children }) {
  return <div className={s(styles.container)}>{children}</div>;
}

export default Container;
