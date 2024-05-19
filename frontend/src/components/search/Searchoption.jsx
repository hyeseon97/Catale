// Searchoption 컴포넌트
import styles from "./Searchoption.module.css";
import React from "react";

export default function Searchoption({
  searchopt,
  setSearchopt,
  optionKey,
  title,
  optionstrue,
  setOptionstrue,
  talk,
}) {
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSearchopt((prevState) => ({
      ...prevState,
      [optionKey]: value,
    }));
    setOptionstrue((prevState) => ({
      ...prevState,
      [optionKey]: false, // 해당 범주가 무시되었음을 나타내는 상태를 true로 설정합니다.
    }));
  };

  const handleIgnore = () => {
    setOptionstrue((prevState) => ({
      ...prevState,
      [optionKey]: !optionstrue, // 해당 범주가 무시되었음을 나타내는 상태를 true로 설정합니다.
    }));
  };

  return (
    <div className={styles.optionContainer}>
      <div className={styles.otptop}>
        <div className={optionstrue ? styles.titletrue : styles.optionTitle}>
          {title}
        </div>
        <div
          className={optionstrue ? styles.ignoreButton : styles.Button}
          onClick={handleIgnore}
        >
          상관없음
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="5"
        value={searchopt}
        onChange={(e) => handleSliderChange(e)}
        className={optionstrue ? styles.blurred : styles.rangeInput}
      />
      <div className={styles.지금선택}>
        <div className={styles.영백}>낮음</div>
        <div className={optionstrue ? styles.talktrue : styles.talkfalse}>
          {talk[searchopt]}
        </div>
        <div className={styles.영백}>높음</div>
      </div>
    </div>
  );
}
