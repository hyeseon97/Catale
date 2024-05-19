import styles from "./Userreasonbox.module.css";
import React, { useState, useEffect } from "react";
import { reasonone } from "../../pages/mainpage/Emodata/Reasonone";

export default function Userreasonbox({
  todayreason,
  setTodayreason,
  setSelectcheck,
}) {
  const backcolor = ["#EDF1FF"];
  const fontcolor = ["#1D1D1D"];
  const selectcolor = ["#708FFE"];

  const [clickedIndexes, setClickedIndexes] = useState([]);
  const [customReason, setCustomReason] = useState(""); // 사용자가 입력한 기분을 저장할 상태 추가

  const [open, setOpen] = useState(false);

  const clickevent = (string, index) => {
    setOpen(false);
    setTodayreason(string);
    setClickedIndexes([index]);
    setSelectcheck(true);
  };

  const openwrite = () => {
    if (customReason !== "") {
      setSelectcheck(true);
    } else {
      setSelectcheck(false);
    }
    setTodayreason(customReason);
    setClickedIndexes([]);
    setOpen(true);
  };

  useEffect(() => {
    if (customReason != "") {
      setSelectcheck(true);
    } else {
      setSelectcheck(false);
    }
  }, [customReason]); // 사용자가 직접 입력한 기분도 감시

  const handleCustomReasonChange = (e) => {
    setCustomReason(e.target.value); // 사용자가 입력한 기분 업데이트
    setTodayreason(e.target.value);
  };

  return (
    <>
      <div className={styles.감정선택칸}>
        <>
          {reasonone.map((mod, index) => (
            <div
              className={`${styles.상자하나} ${
                clickedIndexes.includes(index) ? styles.selected : ""
              }`}
              key={index}
              onClick={() => clickevent(mod, index)}
              style={{
                backgroundColor: clickedIndexes.includes(index)
                  ? selectcolor
                  : backcolor,
              }}
            >
              {mod}
            </div>
          ))}
          <div
            className={styles.상자하나}
            onClick={() => openwrite()}
            style={{
              backgroundColor: open ? selectcolor : backcolor,
            }}
          >
            {customReason === "" ? "직접 입력" : `${customReason}`}
          </div>
        </>
        {/* 텍스트 입력 필드 */}
        {open && (
          <div>
            <input
              type="text"
              placeholder="직접 입력"
              value={customReason}
              onChange={handleCustomReasonChange}
              className={styles.인풋창}
              style={{ color: "black" }}
            />
            {/* 직접 입력한 기분 추가 버튼 */}
          </div>
        )}
      </div>
    </>
  );
}
