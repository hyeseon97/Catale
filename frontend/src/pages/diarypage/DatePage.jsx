import { useParams } from "react-router";
import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import glass1 from "../../assets/glass/glass1.png";
import glass2 from "../../assets/glass/glass2.png";
import glass3 from "../../assets/glass/glass3.png";
import glass4 from "../../assets/glass/glass4.png";
import glass5 from "../../assets/glass/glass5.png";
import glass6 from "../../assets/glass/glass6.png";
import glass7 from "../../assets/glass/glass7.png";
import pentagon from "../../assets/common/pentagon.png";
import styles from "./DatePage.module.css";
import { mood1, mood2 } from "../mainpage/Emodata/Emotionthree";
import s from "classnames";
import { useState, useEffect } from "react";
import CocktailDetail from "../../components/diary/CocktailDetail";
import { deletediary, detaildiary } from "../../api/Diary";
import Lottie from "lottie-react";
import Cocktail1 from "../../assets/lottie/Cocktail1.json";
import {
  selectcolor,
  fontcolor,
  backcolor,
} from "../mainpage/Emodata/Emocolor";
import { useNavigate } from "react-router-dom";
import trash from "../../assets/common/trash.png";
import close from "../../assets/common/close.png";

export default function DatePage() {
  const navigate = useNavigate();
  const { diaryId } = useParams();
  const [detail, setDetail] = useState(false);
  const [modal, setModal] = useState(false);
  const [emotions, setEmotions] = useState([]);
  const [response, setResponse] = useState();
  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const res = await detaildiary(diaryId);
        setResponse(res.data); // 데이터를 상태에 저장

        // 감정 데이터 처리 및 필터링
        const emotionData = res.data;
        const filteredEmotions = [];
        if (emotionData.emotion1 !== 0) {
          filteredEmotions.push(emotionData.emotion1);
        }
        if (emotionData.emotion2 !== 0) {
          filteredEmotions.push(emotionData.emotion2);
        }
        if (emotionData.emotion3 !== 0) {
          filteredEmotions.push(emotionData.emotion3);
        }
        setEmotions(filteredEmotions);
      } catch (error) {
        console.error("Error fetching cocktail today:", error);
      }
    };
    if (diaryId) {
      // diaryId가 있을 때만 요청을 보냄
      fetchCocktail();
    }
  }, [diaryId]);

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
  const num = [
    [],
    [35, 45, 60],
    [48, 55, 62],
    [48, 55, 62],
    [40, 53, 65],
    [30, 45, 65],
    [35, 45, 55],
    [25, 40, 55],
  ];

  const mood = [
    "",
    "많이 속상했던 날..",
    "조금 속상했던 날..",
    "그럭저럭인 날",
    "기분 좋은 날!",
    "정말 행복했던 날!!!",
  ];

  const createdAt = response?.createdAt ? new Date(response.createdAt) : null;
  const formattedDate = createdAt
    ? `${String(createdAt.getMonth() + 1)}월 ${String(createdAt.getDate())}일`
    : "";

  const handledeletediary = async (id) => {
    await deletediary(id);
    navigate(-1);
  };

  return (
    <Container>
      <Headerwb title={formattedDate}>
        <img
          src={trash}
          alt="trash"
          className={styles.trash}
          onClick={() => setModal(true)}
        />
      </Headerwb>
      {!response && (
        <div className={styles.로딩중}>
          <Lottie animationData={Cocktail1} className={styles.lottie} />
          로딩중
        </div>
      )}
      {response && (
        <div
          className={styles.background}
          style={{
            background: `linear-gradient(135deg, ${response.color1} 0%,  ${response.color2} 50%, ${response.color3} 100%)`,
          }}
        >
          <div className={styles.cover}>
            <div className={styles.flip}>
              <div className={styles.card}>
                <div
                  className={s(styles.cocktail, detail && styles.show_detail)}
                >
                  <div
                    className={styles.glass_cover}
                    style={{
                      background: `linear-gradient(180deg, ${response.color3} ${
                        num[response.glass][0]
                      }%, ${response.color2} ${num[response.glass][1]}%, ${
                        response.color1
                      } ${num[response.glass][2]}%, ${response.color1} 100%)`,
                    }}
                    onClick={() => navigate(`/cocktail/${response.cocktailId}`)}
                  >
                    <img
                      src={glasses[response.glass]}
                      alt="glass"
                      className={styles.glass}
                    />
                  </div>
                  <div className={styles.name}>{response.name}</div>
                  <div className={styles.content}>{response.content}</div>
                  <div className={styles.cocktail_bottom}>
                    <div className={styles.cocktail_left}>
                      {emotions.map((emo, i) => {
                        const index = (emo - (emo % 10)) / 10;
                        const j = emo % 10;
                        return <div>{mood1[index][j]}</div>;
                      })}
                    </div>
                    <div
                      className={styles.cocktail_right}
                      onClick={() => setDetail(true)}
                    >
                      <div>상세정보</div>
                      <img
                        src={pentagon}
                        alt="pentagon"
                        className={styles.icon}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={s(styles.detail, detail && styles.show_cocktail)}
                  onClick={() => setDetail(false)}
                >
                  <CocktailDetail cocktail={response} />
                </div>
              </div>
            </div>
            <div className={styles.title}>오늘의 이야기</div>
            <div className={s(styles[`mood${response.mood}`], styles.mood)}>
              {mood[response.mood]}
            </div>
            <div>
              <div className={styles.폰트들}>{response.reason} 때문에</div>
            </div>
            <div className={styles.감정들}>
              {emotions.map((emo, i) => {
                const index = (emo - (emo % 10)) / 10;
                const j = emo % 10;
                if (emotions.length - 1 > i) {
                  return (
                    <div
                      style={{
                        color: fontcolor[index],
                        backgroundColor: backcolor[index],
                      }}
                      className={styles.폰트들}
                    >
                      {mood2[index][j]}
                    </div>
                  );
                } else {
                  return (
                    <div
                      style={{
                        color: fontcolor[index],
                        backgroundColor: backcolor[index],
                      }}
                      className={styles.폰트들}
                    >
                      {mood1[index][j]}
                    </div>
                  );
                }
              })}
            </div>
            <div className={styles.폰트들}>감정을 느낀 하루였어</div>
            <br />
            <div className={styles.폰트들}>{response.comment}</div>
          </div>
        </div>
      )}
      <div
        className={s(styles.blur, modal ? styles.active : styles.no)}
        onClick={() => setModal(false)}
      ></div>
      <div className={s(styles.modal, !modal && styles.none)}>
        <div className={styles.delete_top}>
          <img
            src={close}
            alt="close"
            className={styles.icon}
            onClick={() => setModal(false)}
          />
          <div className={styles.delete_title}>일기 삭제</div>
          <div className={styles.icon}></div>
        </div>
        <div className={styles.delete_text}>일기를 삭제하시겠습니까?</div>
        <div className={styles.delete_bottom}>
          <div className={styles.delete_cancel} onClick={() => setModal(false)}>
            취소
          </div>
          <div
            className={styles.delete_delete}
            onClick={() => {
              handledeletediary(diaryId);
              setModal(false);
            }}
          >
            삭제
          </div>
        </div>
      </div>
    </Container>
  );
}
