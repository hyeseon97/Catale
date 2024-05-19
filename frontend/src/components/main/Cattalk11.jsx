import styles from "./Cattalkbox.module.css";
import React, { useEffect, useState } from "react";
import { mood1, mood2 } from "../../pages/mainpage/Emodata/Emotionthree";
import { selectcolor } from "../../pages/mainpage/Emodata/Emocolor";

export default function Cattalk11({ talkarr, 말풍선, todayemo }) {
  const [talkObjects, setTalkObjects] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [currentText2, setCurrentText2] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const newTalkObjects = todayemo.map((emo, index) => {
      const moodIndex = Math.floor(emo / 10);
      const talk =
        index === todayemo.length - 1
          ? mood1[moodIndex][emo % 10]
          : mood2[moodIndex][emo % 10];
      const color = selectcolor[moodIndex];
      return { id: index, talk, color }; // 각 요소에 고유한 id 추가
    });
    setTalkObjects(newTalkObjects);
    showText(" 오늘은");
  }, [todayemo]);

  const showText = (text) => {
    let charIndex = 0;
    const id = setInterval(() => {
      setCurrentText((prevText) => prevText + text[charIndex]);
      charIndex++;
      if (charIndex === text.length - 1) {
        clearInterval(id);
        showEndText(" 하루였구냥!");
      }
    }, 60);
    setIntervalId(id);
  };

  const showEndText = (text) => {
    let charIndex = 0;
    const id = setInterval(() => {
      setCurrentText2((prevText) => prevText + text[charIndex]);
      charIndex++;
      if (charIndex === text.length - 1) {
        clearInterval(id);
      }
    }, 60);
    setIntervalId(id);
  };

  return (
    <>
      <div className={styles.고양이말풍선}>
        <img className={styles.말풍선} src={말풍선} alt="" />
        <div className={styles.고양이이름}>태일이</div>
        <div className={styles.고양이내용11}>
          <>
            <div>{currentText}</div>
            <div className={styles.감정대화}>
              {/* 각 요소에 고유한 key prop을 추가 */}
              {talkObjects.map((talkObj) => (
                <div key={talkObj.id} style={{ color: talkObj.color }}>
                  {talkObj.talk}
                </div>
              ))}
            </div>
            <div>{currentText2}!</div>
          </>
        </div>
      </div>
    </>
  );
}
