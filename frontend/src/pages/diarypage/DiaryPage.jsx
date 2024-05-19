import React from "react";
import styles from "./DiaryPage.module.css";
import Container from "../../components/common/Container";
import Nav from "../../components/common/Nav";
import Header from "../../components/common/Header";
import prev from "../../assets/common/arrow1.png";
import next from "../../assets/common/arrow2.png";
import card from "../../assets/common/card.png";
import glass1 from "../../assets/glass/glass1.png";
import glass2 from "../../assets/glass/glass2.png";
import glass3 from "../../assets/glass/glass3.png";
import glass4 from "../../assets/glass/glass4.png";
import glass5 from "../../assets/glass/glass5.png";
import glass6 from "../../assets/glass/glass6.png";
import glass7 from "../../assets/glass/glass7.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Popup from "../../components/common/Popup";
import { monthdiary, todaydiary } from "../../api/Diary";
import s from "classnames";

export default function DiaryPage() {
  const navigate = useNavigate();
  // 현재 날짜 가져오기 및 상태 설정
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [response, setResponse] = useState([]);
  const [istoday, setToday] = useState(true);

  // 달의 첫째 날과 마지막 날 구하기
  const firstDayOfMonth = new Date(year, month, 1); // 해당 월의 첫째 날을 구함
  const lastDayOfMonth = new Date(year, month + 1, 0); // 해당 월의 마지막 날을 구함

  // 달력에 표시할 날짜 배열 만들기
  const dates = []; // 날짜를 저장할 배열 생성
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 해당 월의 첫째 날의 요일을 구함
  for (let i = 1 - firstDayOfWeek; i <= lastDayOfMonth.getDate(); i++) {
    // 해당 월의 날짜를 순회하며 배열에 추가
    const currDate = new Date(year, month, i); // 현재 날짜를 생성
    if (i > 0) {
      dates.push({ date: currDate, isInCurrentMonth: true }); // 현재 월에 속하는 날짜인 경우 배열에 추가
    } else {
      dates.push({ date: currDate, isInCurrentMonth: false }); // 이전 달 또는 다음 달에 속하는 날짜인 경우 배열에 추가
    }
  }

  // 이전 달로 이동하는 함수
  const goToPrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };
  // 다음 달로 이동하는 함수
  const goToNextMonth = () => {
    if (!(year === today.getFullYear() && month === today.getMonth())) {
      if (month === 11) {
        setYear(year + 1);
        setMonth(0);
      } else {
        setMonth(month + 1);
      }
    }
  };

  useEffect(() => {
    const fetchdiary = async () => {
      try {
        const response = await monthdiary(year, month);
        setResponse(response.data); // 데이터를 상태에 저장
      } catch (error) {
        console.error(error);
      }
    };

    fetchdiary();
  }, [month]);
  useEffect(() => {
    async function fetchMyData() {
      const istoday = await todaydiary();
      try {
        if (!istoday.data) {
          setToday(false);
        }
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    }

    fetchMyData();
  }, []);

  // response에서 createdAt 속성 추출하여 특별한 날짜 배열 생성
  const specialDates = response.map((item) => item.createdAt.split("T")[0]);

  // 특별한 날짜에 대한 스타일 설정
  const dateStyles = {};
  specialDates.forEach((date) => {
    dateStyles[date] = styles.specialDate;
  });
  const glasses = [
    glass1,
    glass1,
    glass2,
    glass3,
    glass4,
    glass5,
    glass6,
    glass7,
  ];

  return (
    <Container>
      <Header>
        {year}년 {month + 1}월
      </Header>
      <div className={styles.main}>
        <div>
          {!istoday && (
            <div className={s(styles.popup, !istoday && styles.motion)}>
              <Popup
                img={card}
                subText={`아직 오늘의 기록을 하지 않았어요!`}
                text={"바텐더와 대화하러가기"}
                src={"/bar"}
              />
            </div>
          )}
          <div className={styles.navigation}>
            <div className={styles.icon_container}>
              <img
                src={prev}
                alt="prev"
                className={styles.icon}
                onClick={goToPrevMonth}
              />
            </div>

            <div>{`${month + 1}월`}</div>
            <div className={styles.icon_container}>
              {!(year === today.getFullYear() && month === today.getMonth()) ? (
                <img
                  src={next}
                  alt="next"
                  className={styles.icon}
                  onClick={goToNextMonth}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className={styles.week}>
            <div className={styles.sunday}>일</div>
            <div>월</div>
            <div>화</div>
            <div>수</div>
            <div>목</div>
            <div>금</div>
            <div className={styles.saturday}>토</div>
          </div>
          <div className={styles.calendar}>
            {/* 달력 영역 */}
            {/* 날짜 요소 매핑 */}
            {dates.map((d, index) => {
              let className = styles.date;
              const dateString = `${d.date.getFullYear()}-${(
                "0" +
                (d.date.getMonth() + 1)
              ).slice(-2)}-${("0" + d.date.getDate()).slice(-2)}`;

              // 특별한 날짜에 해당하는 정보 찾기
              const specialDateInfo = response.find(
                (item) => item.createdAt.split("T")[0] === dateString
              );

              // 특별한 날짜에 따라 클래스 추가
              if (d.date.getDay() === 0) className += " " + styles.sunday;
              if (d.date.getDay() === 6) className += " " + styles.saturday;

              if (!d.isInCurrentMonth) className += " " + styles.otherMonth;
              if (d.date > today) className += " " + styles.grayedOut;
              if (
                d.date.getFullYear() === today.getFullYear() &&
                d.date.getMonth() === today.getMonth() &&
                d.date.getDate() === today.getDate()
              )
                className += " " + styles.today;
              // 특별한 날짜에 해당하는 정보가 있을 경우 처리
              if (specialDateInfo) {
                className += " " + dateStyles[dateString];

                return (
                  <div
                    key={index}
                    className={className}
                    style={{
                      border: `solid 2px var(--feel${specialDateInfo.mood})`,
                      boxShadow: `0 0 10px 0 var(--feel${specialDateInfo.mood})`,
                    }}
                    onClick={() => navigate(`${specialDateInfo.id}`)}
                  >
                    <div className={styles.number}>{d.date.getDate()}</div>
                    {dateStyles[dateString] && (
                      <div>
                        <img
                          src={glasses[specialDateInfo.glass]}
                          alt="glass"
                          className={styles.glass}
                          style={{
                            background: `linear-gradient(0deg, ${specialDateInfo.color1} 1%, ${specialDateInfo.color1} 40%, ${specialDateInfo.color2} 50%, ${specialDateInfo.color3} 60%, ${specialDateInfo.color3} 98%, #00000000 99%, #00000000 100%)`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              } else {
                // 특별한 날짜에 해당하는 정보가 없을 경우 처리
                return (
                  <div key={index} className={className}>
                    <div className={styles.number}>{d.date.getDate()}</div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      <Nav num={4} />
    </Container>
  );
}
