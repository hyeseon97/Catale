import ContainerMain from "../../components/common/ContainerMain";
import styles from "./MainPage.module.css";
import Nav from "../../components/common/Nav";
import 배경바 from "../../assets/bartender/꼬질냥.gif";
import 배경바2 from "../../assets/bartender/자산8.png";
import React from "react";
import { useState, useEffect } from "react";
import Cattalkbox from "../../components/main/Cattalkbox";
import { talkarr } from "./Talkdata/Talkarr";
import Userselctbox from "../../components/main/Userselctbox";
import Usertalkbox from "../../components/main/Usertalkbox";
import Usertodayemo from "../../components/main/Usertodayemo";
import 고양이말풍선 from "../../assets/bartender/고양이말풍선.png";
import 유저말풍선 from "../../assets/bartender/유저말풍선.png";
import Useremothree from "../../components/main/Useremothree";
import { mood1 } from "../mainpage/Emodata/Emotionthree";
import Cattalk11 from "../../components/main/Cattalk11";
import Userreasonbox from "../../components/main/Userreasonbox";
import Usercomment from "../../components/main/Usercomment";
import { selectcolor } from "./Emodata/Emocolor";
import cocktail from "../../assets/bartender/오늘의칵테일1.png";
import useUserStore from "../../store/useUserStore";
import Cattalk20 from "../../components/main/Cattalk20";
import { useNavigate } from "react-router-dom";
import Todaycocktail from "../../components/main/Todaycocktail";
import { todaydiary } from "../../api/Diary";

export default function MainPage() {
  const navigate = useNavigate();
  //유저를 일단 담아놓고~
  const user = useUserStore((state) => state.user);
  const [today, setToday] = useState(false);
  //대화의 순서
  const [talknum, setTalknum] = useState(1);
  const [selectnum, setSeletnum] = useState(0);
  //이건 오늘의 기분 하나를 담은거야
  const [nowemonum, setNowemonum] = useState(-1);
  //이거는 오늘의감정 최대 3개담은거
  const [todayemo, setTodayemo] = useState([]);
  //이거는 오늘기분에 대해 한가지 이유를 가져갈거
  const [todayreason, setTodayreason] = useState("");
  //선택했는지확인
  const [selectcheck, setSelectcheck] = useState(false);
  //오늘하루의 코멘트를 담아봐요
  const [todaycomment, setTodaycomment] = useState("");
  // cattalk에서 0은 없는거 1은 다음버튼있는거 2는 다음버튼없는거 3은 고르시오
  // usertakl에서 0은 없는거 1은 대화 2,3,4,5,6,7은 특정고르기

  const [todayalc, setTodayalc] = useState(user.alc);

  useEffect(() => {
    async function fetchMyData() {
      const istoday = await todaydiary();
      try {
        if (istoday.data) {
          setToday(true);
          //여기서 오늘대화의 결과를 가져오는걸 써야해
          setTalknum(25);
        }
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    }

    fetchMyData();
  }, []);

  const resetclick = () => {
    setTalknum(1);
    setSelectcheck(false);
    setNowemonum(-1);
    setTodayreason("");
    setTodaycomment("");
    setTodayemo([]);
    setSeletnum(0);
    setTodayalc(user.alc);
    // useTodayStore.getState().setToday(false); // today 상태 변경
  };

  return (
    <ContainerMain>
      <div className={styles.main}>
        {talknum >= 8 && nowemonum !== -1 && (
          <>
            <div className={styles.재료상자}>
              <div className={styles.재료}>
                <div className={styles.재료글자}>오늘의 재료</div>
                <div className={styles.감정선택요소}>
                  <div className={styles.이모지하나하나}>
                    <img
                      className={styles.이모지하나하나}
                      src={require(`../../assets/bartender/emo${
                        nowemonum + 1
                      }.png`)}
                      alt=""
                    />
                  </div>
                  {todayemo.map((emo, index) => (
                    <div
                      key={index} // 각 요소에 인덱스를 사용하여 고유한 "key" prop을 제공합니다.
                      className={styles.이모지하나하나}
                      style={{
                        backgroundColor: selectcolor[Math.floor(emo / 10)],
                        // boxShadow: `0px 0px 10px 0px rgba(255, 255, 255, 0.54)`,
                      }}
                    ></div>
                  ))}
                  {talknum >= 17 && (
                    <div
                      className={styles.이모지하나하나}
                      style={{
                        backgroundImage: `url(${require("../../assets/bartender/종이비행기.png")})`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {/* 이거로 지금 배경바 크기를 지정해놨음 */}
        <div className={styles.aspectcontainer}>
          <div className={styles.aspectcontent}>
            <img className={styles.배경바2} src={배경바2} alt="" />
            <img className={styles.배경바} src={배경바} alt="" />
            {(talknum === 24 || talknum === 25) && (
              <div
                className={styles.오늘의칵테일}
                onClick={() => navigate("result")}
              >
                <img className={styles.칵테일} src={cocktail} alt="" />
                <div className={styles.칵테일글자}>오늘의 칵테일</div>
                <div className={styles.클릭글자}>click !</div>
              </div>
            )}
          </div>
        </div>
        {/*  */}
        {talknum !== 3 &&
          talknum !== 4 &&
          talknum !== 10 &&
          talknum !== 11 &&
          talknum !== 14 &&
          talknum !== 16 &&
          talknum !== 20 &&
          talknum !== 21 &&
          talknum !== 22 && (
            <Cattalkbox
              talknum={talknum}
              setTalknum={setTalknum}
              talkarr={talkarr[talknum]}
              말풍선={고양이말풍선}
            />
          )}
        {(talknum === 20 || talknum === 21) && (
          <Cattalk20
            talknum={talknum}
            setTalknum={setTalknum}
            talkarr={talkarr[talknum]}
            말풍선={고양이말풍선}
            nickname={user.nickname}
            alc={user.alc}
          />
        )}
        {(talknum === 3 || talknum === 4 || talknum === 22) && (
          <Cattalkbox
            talknum={talknum}
            setTalknum={setTalknum}
            talkarr={talkarr[talknum]}
            selectnum={selectnum}
            말풍선={고양이말풍선}
          />
        )}
        {(talknum === 10 || talknum === 14 || talknum === 16) && (
          <Cattalkbox
            talknum={talknum}
            setTalknum={setTalknum}
            talkarr={talkarr[talknum]}
            selectcheck={selectcheck}
          />
        )}
        {talknum === 11 && (
          <Cattalk11
            talkarr={talkarr[talknum]}
            말풍선={고양이말풍선}
            todayemo={todayemo}
          />
        )}
        {/* 얘들은 선택하는 거여서 어떤 선택을했는지 가져가야해 그리고
        11번같은 경우는 내가 선택한 감정을 확인해주는 역할을 해야해 */}
        {(talknum === 2 || talknum === 11 || talknum === 21) && (
          <Userselctbox
            talknum={talknum}
            setTalknum={setTalknum}
            talkarr={talkarr[talknum]}
            setSeletnum={setSeletnum}
            setTodayemo={setTodayemo}
            setSelectcheck={setSelectcheck}
            todayalc={todayalc}
            setTodayalc={setTodayalc}
          />
        )}
        {(talknum === 3 || talknum === 22) && (
          <Usertalkbox
            talknum={talknum}
            setTalknum={setTalknum}
            talkarr={talkarr[talknum]}
            selectnum={selectnum}
            말풍선={유저말풍선}
            usernickname={user.nickname}
          />
        )}
        {(talknum === 6 || talknum === 12) && (
          <Usertalkbox
            talknum={talknum}
            setTalknum={setTalknum}
            talkarr={talkarr[talknum]}
            말풍선={유저말풍선}
            usernickname={user.nickname}
          />
        )}
        {talknum === 5 && (
          //여기서 감정고르는건데 그거 고르는거 숫자 가져가자
          <Usertodayemo
            talknum={talknum}
            setTalknum={setTalknum}
            setNowemonum={setNowemonum}
          />
        )}
        {talknum === 10 && (
          //여기서 감정고르는건데 그거 고르는거 숫자 가져가자
          <Useremothree
            todayemo={todayemo}
            setTodayemo={setTodayemo}
            setSelectcheck={setSelectcheck}
            mood1={mood1}
          />
        )}
        {/*  */}
        {talknum === 14 && (
          //여기서는 오늘 감정에 가장 영향을 준것을 고르는건데 string을 저장하게 해야해
          <Userreasonbox
            setSelectcheck={setSelectcheck}
            todayreason={todayreason}
            setTodayreason={setTodayreason}
          />
        )}
        {talknum === 16 && (
          //여기서는 오늘 하루 코멘트를 저장할 수 있는 곳이야 이것도 스트링 넘겨
          //건너뛰기 버튼이있어서 작성했는지의 check는 안념겨도돼
          //오늘 하루의 코멘트만 가져가면될듯하오
          <Usercomment
            todaycomment={todaycomment}
            setTodaycomment={setTodaycomment}
            setSelectcheck={setSelectcheck}
          />
        )}
        {talknum === 23 && (
          //블렌딩 시작버튼이 있으면 좋을거같아서 만든버튼
          <Todaycocktail
            talknum={talknum}
            setTalknum={setTalknum}
            mood={nowemonum}
            emotion={todayemo}
            reason={todayreason}
            comment={todaycomment}
            alc={todayalc}
          />
        )}
        {talknum === 25 && (
          //블렌딩 시작버튼이 있으면 좋을거같아서 만든버튼
          <div className={styles.다시추천} onClick={() => resetclick()}>
            다시 추천 받고싶어
          </div>
        )}
      </div>
      <Nav num={3} />
    </ContainerMain>
  );
}
