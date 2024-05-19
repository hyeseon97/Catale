import styles from "./Useremothree.module.css";
import React, { useState, useEffect } from "react";
import {
  selectcolor,
  backcolor,
  fontcolor,
} from "../../pages/mainpage/Emodata/Emocolor";

export default function Useremothree({
  todayemo,
  setTodayemo,
  setSelectcheck,
  mood1,
}) {
  const [clickedIndexes, setClickedIndexes] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);

  const removeValue = (valueToRemove) => {
    setTodayemo(todayemo.filter((value) => value !== valueToRemove));
    setClickedIndexes(
      clickedIndexes.filter((index) => index !== valueToRemove)
    );
  };

  const clickevent = (a, b) => {
    const newValue = a * 10 + b;
    if (todayemo.includes(newValue)) {
      removeValue(newValue); // 이미 존재하는 값이라면 제거
    } else if (clickedIndexes.length < 3) {
      setTodayemo([...todayemo, newValue]);
      setClickedIndexes([...clickedIndexes, newValue]);
    } else {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 2000); // 2초 후에 토스트를 숨김
    }
  };

  const checkLength = () => {
    if (todayemo.length === 0) {
      setSelectcheck(false);
    } else {
      setSelectcheck(true);
    }
  };

  useEffect(() => {
    checkLength();
  }, [todayemo]);

  return (
    <>
      <div className={styles.감정선택칸}>
        {mood1.map((mood, index1) => (
          <React.Fragment key={index1}>
            {mood.map((mod, index2) => (
              <div
                key={index2}
                style={{
                  backgroundColor: clickedIndexes.includes(index1 * 10 + index2)
                    ? selectcolor[index1]
                    : backcolor[index1],
                  color: fontcolor[index1],
                  border: clickedIndexes.includes(index1 * 10 + index2)
                    ? `3px solid #ffffff`
                    : `3px solid ${fontcolor[index1]}`,
                  boxShadow: clickedIndexes.includes(index1 * 10 + index2)
                    ? `0px 0px 10px 0px rgba(255, 255, 255, 0.54)`
                    : "none",
                }}
                className={styles.상자하나}
                onClick={() => clickevent(index1, index2)}
              >
                {mod}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {toastVisible && (
        <div className={styles.toast}>
          최대 3개의 감정을 선택할 수 있습니다.
        </div>
      )}
    </>
  );
}
