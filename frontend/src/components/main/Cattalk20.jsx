import styles from "./Cattalkbox.module.css";
import { cattalk } from "../../pages/mainpage/Talkdata/Cattalk";
import React, { useState, useEffect } from "react";
import useUserStore from "../../store/useUserStore";

export default function Cattalk20({
  talknum,
  setTalknum,
  talkarr,
  selectnum = -1,
  말풍선,
  nickname,
  alc,
}) {
  //이런조건이여야 고양이가 말을함
  const user = useUserStore((state) => state.user);
  const [currentText, setCurrentText] = useState("");
  const [currentText2, setCurrentText2] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [alctext, setAlctext] = useState("");

  useEffect(() => {
    if (user.alc === 0) {
      setAlctext("무알콜 이");
    } else if (user.alc === 1) {
      setAlctext("0~10도");
    } else if (user.alc === 2) {
      setAlctext("10~15도");
    } else if (user.alc === 3) {
      setAlctext("15~20도");
    } else if (user.alc === 4) {
      setAlctext("20~30도");
    } else if (user.alc === 5) {
      setAlctext("30도 이상이");
    }
    clearInterval(intervalId);
    setCurrentText("");
    setShowNextButton(false);
    showText(
      ` ${nickname}의 취향 도수는 ${alctext}다냥!\n취향대로 섞어줄까냥 ? `
    );
    setCurrentText2(
      ` ${nickname}의 취향 도수는 ${alctext}다냥!\n취향대로 섞어줄까냥 ? `
    );
  }, [talknum, talkarr, alctext]);

  const showText = (text) => {
    let charIndex = 0;
    const id = setInterval(() => {
      setCurrentText((prevText) => prevText + text[charIndex]);
      charIndex++;
      if (charIndex === text.length - 1) {
        clearInterval(id);
        setShowNextButton(true);
      }
    }, 60);
    setIntervalId(id);
  };

  const handleNext = () => {
    setTalknum(talknum + 1);
  };

  const renderTextWithLineBreaks = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  return (
    <>
      {selectnum === -1 && talkarr.cat !== 0 && talkarr.cat !== 3 && (
        <div className={styles.고양이말풍선}>
          {talkarr.cat !== 3 ? (
            <img className={styles.말풍선} src={말풍선} alt="" />
          ) : (
            <>
              <div className={styles.만들자말풍선} />
            </>
          )}

          {talkarr.cat !== 3 && (
            <>
              <div className={styles.고양이이름}>태일이</div>

              {talknum !== 21 && (
                <div className={styles.고양이내용}>
                  {renderTextWithLineBreaks(currentText)}
                </div>
              )}
              {talknum === 21 && (
                <div className={styles.고양이내용}>
                  {currentText2.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </>
          )}
          {talknum !== 24 && talkarr.cat === 1 && (
            <div className={styles.고양이다음} onClick={() => handleNext()}>
              <div className={styles.click}>click !</div>
              <div className={styles.역삼각형}></div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
