import styles from "./ReviewItem.module.css";
import glass1 from "../../assets/glass/glass1.png";
import glass2 from "../../assets/glass/glass2.png";
import glass3 from "../../assets/glass/glass3.png";
import glass4 from "../../assets/glass/glass4.png";
import glass5 from "../../assets/glass/glass5.png";
import glass6 from "../../assets/glass/glass6.png";
import glass7 from "../../assets/glass/glass7.png";
import arrow from "../../assets/common/arrow5.png";
import star from "../../assets/common/star.png";
import noneStar from "../../assets/common/noneStar.png";
import trash from "../../assets/common/trash.png";
import like from "../../assets/common/like.png";
import noneLike from "../../assets/common/noneLike.png";
import { useState } from "react";
import { cocktaillike } from "../../api/Cocktail";
import { deletereview } from "../../api/Review";
import { useNavigate } from "react-router-dom";

export default function ReviewItem({ item, setList }) {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState([false, 0]);
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
        items.id === item.id ? { ...items, like: !items.like } : items
      )
    );
    cocktaillike(item.id);
  };

  const toggleDelete = (id) => {
    deletereview(id);
    setList((prevList) =>
      prevList.map((items) => {
        if (items.id === item.id) {
          return {
            ...items,
            reviewList: items.reviewList.filter((rev) => rev.id !== id),
          };
        }
        return items;
      })
    );
    cocktaillike(item.id);
  };

  return (
    <>
      <div className={styles.item}>
        <img
          src={glasses[item.glass]}
          alt="glass"
          className={styles.glass}
          style={{
            background: `linear-gradient(0deg, ${item.color1} ${
              num[item.glass][0]
            }%, ${item.color2} ${num[item.glass][1]}%, ${item.color3} ${
              num[item.glass][2]
            }%, ${item.color3} 100%)`,
          }}
          onClick={() => navigate(`/cocktail/${item.id}`)}
        />
        <div className={styles.review_text}>
          <div className={styles.flex}>
            <div className={styles.text}>{item.name}</div>
          </div>
          <div className={styles.subtext}>{item.content}</div>
        </div>
        <div className={styles.icon}>
          <img
            src={item.like ? like : noneLike}
            alt="like"
            className={styles.like}
            onClick={toggleLike} // 클릭하면 toggleLike 함수를 호출
          />
          <img
            src={arrow}
            alt="arrow"
            className={styles.toggle}
            onClick={() => setToggle([!toggle[0], toggle[1] + 180])}
            style={{ transform: `rotate(${toggle[1]}deg)` }}
          />
        </div>
      </div>
      <div
        style={{
          minHeight: toggle[0] ? `${item.reviewList.length * 150 + 10}px` : "0",
        }}
        className={styles.review}
      >
        {item.reviewList.map((rev) => (
          <div>
            <hr className={styles.hr} />
            <div className={styles.review_flex}>
              <div className={styles.review_left}>
                <div className={styles.review_top}>
                  <div>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img
                        src={rev.rate > i ? star : noneStar}
                        alt="star"
                        className={styles.star}
                      />
                    ))}
                  </div>
                  <div className={styles.review_date}>
                    {rev.createAt.split("T")[0]}
                  </div>
                </div>
                <div className={styles.review_content}>{rev.content}</div>
                <div className={styles.review_sweet}>{`단맛:${
                  rev.sweet * 20
                }% | 쓴맛:${rev.bitter * 20}% | 신맛:${rev.sour * 20}% | 탄산:${
                  rev.sparking * 20
                }%`}</div>
              </div>
              <img
                src={trash}
                alt="trash"
                className={styles.trash}
                onClick={() => toggleDelete(rev.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
