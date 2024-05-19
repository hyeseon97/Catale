// 틀 컴포넌트
// 컨테이너에 해당합니다.

import s from "classnames";
import styles from "./ContainerMain.module.css";

function ContainerMain({ children }) {
  return <div className={s(styles.container)}>{children}</div>;
}

export default ContainerMain;
