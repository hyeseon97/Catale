import styles from "./Usertalkbox.module.css";
import { usertalk } from "../../pages/mainpage/Talkdata/Usertalk";
import React from "react";

export default function Usertalkbox({
  talknum,
  setTalknum,
  talkarr,
  selectnum = -1,
  말풍선,
  usernickname,
}) {
  return (
    <>
      <div className={styles.말풍선위치}>
        <div className={styles.유저말풍선}>
          {/* <img className={styles.말풍선} src={말풍선} alt="" /> */}

          <div className={styles.유저이름}>{usernickname}</div>
          <div className={styles.유저내용}>
            {selectnum === -1 ? (
              <div>{usertalk[talkarr.usertalk].talk}</div>
            ) : (
              <div>{usertalk[talkarr[selectnum].usertalk].talk}</div>
            )}
          </div>
          <div
            className={styles.유저다음}
            onClick={() => setTalknum(talknum + 1)}
          >
            <div className={styles.click}>click !</div>
            <div className={styles.역삼각형}></div>
          </div>
        </div>
      </div>
    </>
  );
}
