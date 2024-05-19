import styles from "./Todaycocktail.module.css";
import React, { useState, useEffect } from "react";
import { recommendtoday } from "../../api/Cocktail";
import { savadiary } from "../../api/Diary";
import Lottie from "lottie-react";
import Cocktail1 from "../../assets/lottie/Cocktail1.json";

export default function Todaycocktail({
  talknum,
  setTalknum,
  mood,
  reason,
  comment,
  emotion,
  alc,
}) {
  const [today, setToday] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    const setEmotions = (emotions) => {
      const newToday = {
        mood: mood + 1,
        comment: comment,
        reason: reason,
        emotion1: +emotions[0] || 0, // 배열의 첫 번째 요소 또는 0
        emotion2: +emotions[1] || 0, // 배열의 두 번째 요소 또는 0
        emotion3: +emotions[2] || 0, // 배열의 세 번째 요소 또는 0
        alc: +alc,
      };
      return newToday;
    };

    const updatedToday = setEmotions(emotion);
    setToday(updatedToday);
  }, [emotion, mood, reason, comment]);

  const handleSubmit = async () => {
    setIsLoading(true); // 로딩 상태 설정

    try {
      const result = await recommendtoday(today);

      const updatedToday = {
        ...today,
        cocktailId: result.data.cocktailId,
      };

      const savadiaryResponse = await savadiary(updatedToday);
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsLoading(false); // 로딩 상태 해제
        setTalknum(talknum + 1); // talknum 업데이트
      }, 1600);
    }
  };

  return (
    <>
      {isLoading && (
        <div className={styles.로딩중}>
          <Lottie animationData={Cocktail1} className={styles.lottie} />
        </div>
      )}
      <div className={styles.선택창}>
        <div onClick={handleSubmit}>블렌딩하기</div>
      </div>
    </>
  );
}
