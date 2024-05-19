import styles from "./Usercomment.module.css";
import React, { useEffect, useState } from "react";
import 연필 from "../../assets/bartender/연필.png";

export default function Usercomment({
  todaycomment,
  setTodaycomment,
  setSelectcheck,
}) {
  const handleCustomReasonChange = (e) => {
    setTodaycomment(e.target.value);
  };

  useEffect(() => {
    if (todaycomment != "") {
      setSelectcheck(true);
    } else {
      setSelectcheck(false);
    }
  }, [todaycomment]); // 사용자가 직접 입력한 기분도 감시

  return (
    <>
      <div className={styles.유저말풍선}>
        <textarea
          placeholder="오늘 하루에 대한 코멘트"
          value={todaycomment}
          onChange={handleCustomReasonChange}
          className={styles.인풋창}
          style={{ color: "black" }}
        />
        <img src={연필} alt="" className={styles.연필} />
        {/* <button onClick={checkcomment}>확인</button> */}
      </div>
    </>
  );
}
