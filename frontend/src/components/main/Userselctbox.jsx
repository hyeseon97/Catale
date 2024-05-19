import styles from "./Userselctbox.module.css";
import React from "react";
import { selelctalk } from "../../pages/mainpage/Talkdata/Selecttalk";

export default function Userselctbox({
  talknum,
  setTalknum,
  talkarr,
  setSeletnum,
  setTodayemo,
  setSelectcheck,
  todayalc,
  setTodayalc,
}) {
  const nowselecttalk = selelctalk[talkarr.select];

  const clickevent = (talk) => {
    setTalknum(talknum + 1);
    setSeletnum(talk.num);
  };

  const clickevent11_1 = (talk) => {
    setSelectcheck(false);
    setTalknum(talk.num);
  };

  const clickevent11_2 = (talk) => {
    setSelectcheck(false);
    setTodayemo([]);
    setTalknum(talk.num);
  };

  const clickevent21_1 = (talk) => {
    setTodayalc(todayalc - 1);
    setTalknum(talknum + 1);
    setSeletnum(talk.num);
  };
  const clickevent21_2 = (talk) => {
    setTalknum(talknum + 1);
    setSeletnum(talk.num);
  };
  const clickevent21_3 = (talk) => {
    setTodayalc(todayalc + 1);
    setTalknum(talknum + 1);
    setSeletnum(talk.num);
  };
  return (
    <div className={styles.선택창}>
      <div>{nowselecttalk[0].talk}</div>
      {talknum !== 11 && talknum != 21 && (
        <>
          {nowselecttalk.map(
            (talk, index) =>
              // 각 요소에 고유한 key prop 추가
              // 여기서는 talk.num을 사용할 수 있음
              talk.num !== -1 && (
                <div
                  className={styles.선택}
                  key={index}
                  onClick={() => clickevent(talk)}
                >
                  <div>{talk.talk}</div>
                </div>
              )
          )}
        </>
      )}
      {talknum === 11 && (
        <>
          <div
            className={styles.선택}
            onClick={() => clickevent11_1(nowselecttalk[1])}
          >
            <div>{nowselecttalk[1].talk}</div>
          </div>
          <div
            className={styles.선택}
            onClick={() => clickevent11_2(nowselecttalk[2])}
          >
            <div>{nowselecttalk[2].talk}</div>
          </div>
        </>
      )}
      {talknum === 21 && (
        <>
          {todayalc !== 0 && (
            <div
              className={styles.선택}
              onClick={() => clickevent21_1(nowselecttalk[1])}
            >
              <div>{nowselecttalk[1].talk}</div>
            </div>
          )}
          <div
            className={styles.선택}
            onClick={() => clickevent21_2(nowselecttalk[2])}
          >
            <div>{nowselecttalk[2].talk}</div>
          </div>
          {todayalc !== 5 && (
            <div
              className={styles.선택}
              onClick={() => clickevent21_3(nowselecttalk[3])}
            >
              <div>{nowselecttalk[3].talk}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
