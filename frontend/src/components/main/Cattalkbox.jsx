import styles from "./Cattalkbox.module.css";
import { cattalk } from "../../pages/mainpage/Talkdata/Cattalk";
import React, { useState, useEffect } from "react";

export default function Cattalkbox({
  talknum,
  setTalknum,
  talkarr,
  selectnum = -1,
  selectcheck,
  말풍선,
}) {
  //이런조건이여야 고양이가 말을함
  const [currentText, setCurrentText] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    clearInterval(intervalId);
    setCurrentText("");
    setShowNextButton(false);
    if (selectnum === -1 && talkarr.cat !== 0 && talkarr.cat !== 3) {
      showText(cattalk[talkarr.cattalk].talk);
    } else if (
      selectnum !== -1 &&
      talkarr[selectnum].cat !== 0 &&
      talkarr[selectnum].cattalk !== 3
    ) {
      showText(cattalk[talkarr[selectnum].cattalk].talk);
    } else if (
      selectnum !== -1 &&
      talkarr[selectnum].cat !== 0 &&
      talkarr[selectnum].cattalk === 3
    ) {
      //3번일때는 랜덤으로 보내줘잉~
      showText(
        cattalk[talkarr[selectnum].cattalk].talk[Math.floor(Math.random() * 15)]
      );
    }
  }, [talknum, talkarr, selectnum]);

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

  const handleNext2 = () => {
    setTalknum(talknum + 2);
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

              {talknum !== 8 && talknum !== 21 && (
                <div className={styles.고양이내용}>
                  {renderTextWithLineBreaks(currentText)}
                </div>
              )}
              {(talknum === 8 || talknum === 21) && (
                <div className={styles.고양이내용}>
                  {cattalk[talkarr.cattalk].talk
                    .split("\n")
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </div>
              )}
            </>
          )}
          {talknum !== 24 &&
            talkarr.cat === 1 &&
            talknum !== 23 &&
            talknum !== 17 &&
            talknum !== 25 && (
              <div className={styles.고양이다음} onClick={() => handleNext()}>
                <div className={styles.click}>click !</div>
                <div className={styles.역삼각형}></div>
              </div>
            )}
          {talknum === 17 && (
            <div className={styles.고양이다음} onClick={() => handleNext2()}>
              <div className={styles.click}>click !</div>
              <div className={styles.역삼각형}></div>
            </div>
          )}
        </div>
      )}
      {selectnum === -1 && talkarr.cat !== 0 && talkarr.cat === 3 && (
        <div className={styles.고양이말풍선2}>
          {talkarr.cat !== 3 ? (
            <img className={styles.말풍선} src={말풍선} alt="" />
          ) : (
            <>
              <div className={styles.만들자말풍선} />
            </>
          )}

          {talkarr.cat === 3 && (
            <>
              <div className={styles.고양이내용파랑}>
                <>
                  {" "}
                  <div className={styles.여기에만}>
                    {cattalk[talkarr.cattalk].talk
                      .split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </div>
                  {(talknum === 10 || talknum === 14) && selectcheck && (
                    <div
                      className={styles.네모박스}
                      onClick={() => setTalknum(talknum + 1)}
                    >
                      <span className={styles.다음으로}>선택완료</span>
                    </div>
                  )}
                  {talknum === 16 && selectcheck && (
                    <div
                      className={styles.네모박스}
                      onClick={() => setTalknum(talknum + 1)}
                    >
                      <span className={styles.다음으로}>입력완료</span>
                    </div>
                  )}
                  {talknum === 16 && !selectcheck && (
                    <div
                      className={styles.네모박스2}
                      onClick={() => setTalknum(talknum + 1)}
                    >
                      <span className={styles.다음으로}>건너뛰기</span>
                    </div>
                  )}
                </>
              </div>
            </>
          )}
          {talkarr.cat === 1 && (
            <div
              className={styles.고양이다음}
              onClick={() => setTalknum(talknum + 1)}
            >
              <div className={styles.click}>click !</div>
              <div className={styles.역삼각형}></div>
            </div>
          )}
        </div>
      )}
      {selectnum !== -1 && talkarr[selectnum].cat !== 0 && (
        <div className={styles.고양이말풍선}>
          <img className={styles.말풍선} src={말풍선} alt="" />
          <div className={styles.고양이이름}>태일이</div>
          <div className={styles.고양이내용}>
            {renderTextWithLineBreaks(currentText)}
          </div>
          {talknum === 4 && selectnum === 0 ? (
            <div className={styles.고양이다음} onClick={() => setTalknum(2)}>
              <div className={styles.click}>click !</div>
              <div className={styles.역삼각형}></div>
            </div>
          ) : (
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
