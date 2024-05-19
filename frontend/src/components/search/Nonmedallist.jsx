import styles from "./Nonmedallist.module.css";
import glass1 from "../../assets/glass/glass1.png";
import glass2 from "../../assets/glass/glass2.png";
import glass3 from "../../assets/glass/glass3.png";
import glass4 from "../../assets/glass/glass4.png";
import glass5 from "../../assets/glass/glass5.png";
import glass6 from "../../assets/glass/glass6.png";
import glass7 from "../../assets/glass/glass7.png";
import like from "../../assets/common/like.png";
import noneLike from "../../assets/common/noneLike.png";
import { useState } from "react";
import { cocktaillike } from "../../api/Cocktail";
import { useNavigate } from "react-router-dom";
import 은색 from "../../assets/icon/은색.png";
import 동색 from "../../assets/icon/동색.png";
import s from "classnames";

export default function Nonmedallist({ index, response, setList }) {
  const navigate = useNavigate();
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
  const toggleLike = () => {
    setList((prevList) =>
      prevList.map((items) =>
        items.id === response.id ? { ...items, like: !items.like } : items
      )
    );
    cocktaillike(response.id);
  };

  return (
    <div
      className={s(
        styles.cocktail,
        index === 1 ? styles.silver : index === 2 ? styles.bronze : styles.none
      )}
    >
      <div className={styles.top}>
        {index === 1 && (
          <div className={styles.등수}>
            <img src={은색} alt="" className={styles.왕관2} />
          </div>
        )}
        {index === 2 && (
          <div className={styles.등수}>
            <img src={동색} alt="" className={styles.왕관2} />
          </div>
        )}
        {index !== 1 && index !== 2 && (
          <div className={styles.등수}>{index + 1}등</div>
        )}

        <div
          className={styles.name}
          onClick={() => navigate(`/cocktail/${response.id}`)}
        >
          {response.name}
        </div>
        <div className={styles.하트}>
          <img
            src={response.like ? like : noneLike}
            alt="like"
            className={styles.like}
            onClick={toggleLike} // 클릭하면 toggleLike 함수를 호출
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.content}>{response.content}</div>
        <div className={styles.왼쪽}>
          <div
            className={styles.glass_cover}
            style={{
              background: `linear-gradient(180deg, ${response.color3} ${
                num[response.glass][0]
              }%, ${response.color2} ${num[response.glass][1]}%, ${
                response.color1
              } ${num[response.glass][2]}%, ${response.color1} 100%)`,
            }}
            onClick={() => navigate(`/cocktail/${response.id}`)}
          >
            <img
              src={glasses[response.glass]}
              alt="glass"
              className={styles.glass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
