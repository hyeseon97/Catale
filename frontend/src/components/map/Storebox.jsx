// Storebox.js
import React, { useRef, useEffect } from "react";
import s from "classnames";
import styles from "./Storebos.module.css";
import Box from "../common/Box";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/common/arrow3.png";

export default function Storebox({ store, nowclick, onClick }) {
  const navigate = useNavigate();
  const storeRef = useRef(null);

  useEffect(() => {
    if (nowclick === store.number) {
      storeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [nowclick, store.number]);

  return (
    <div
      className={s(styles.store)}
      onClick={() => {
        onClick(store.number);
        navigate(`detail/${store.number}`);
      }}
      ref={storeRef}
    >
      <Box color={nowclick === store.number && true}>
        <div className={styles.박스하나}>
          <div
            className={styles.가게사진}
            style={{
              backgroundImage: `url(${store.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className={styles.가게상세들}>
            <div className={styles.가게이름}>{store.title}</div>
            <div className={styles.가게주소}>{store.주소}</div>
            <div className={styles.가게영업시간}>
              영업시간 : {store.영업시간}
            </div>
          </div>
          <img src={arrow} alt="arrow" className={styles.arrow} />
        </div>
      </Box>
    </div>
  );
}
