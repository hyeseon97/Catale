import Container from "../../components/common/Container";
import useCocktailStore from "../../store/useCocktailStore";
import styles from "./CocktailReviewPage.module.css";
import plus1 from "../../assets/common/plus1.png";
import plus2 from "../../assets/common/plus2.png";
import minus1 from "../../assets/common/minus1.png";
import minus2 from "../../assets/common/minus2.png";
import star from "../../assets/common/star.png";
import noneStar from "../../assets/common/noneStar.png";
import s from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { writereview } from "../../api/Review";

export default function CocktailReviewPage() {
  const navigate = useNavigate();
  const cocktail = useCocktailStore((state) => state.cocktail);
  const taste = [
    ["단맛", "sweet"],
    ["쓴맛", "bitter"],
    ["신맛", "sour"],
    ["탄산", "sparking"],
  ];
  const [percent, setPercent] = useState({
    cocktailId: cocktail.id,
    sweet: cocktail.sweet,
    bitter: cocktail.bitter,
    sour: cocktail.sour,
    sparking: cocktail.sparking,
    content: "",
    rate: 0,
  });

  const handleIncrement = (key) => {
    if (percent[key] < 5) {
      setPercent((prevPercent) => ({
        ...prevPercent,
        [key]: prevPercent[key] + 1,
      }));
    }
  };

  const handleDecrement = (key) => {
    if (percent[key] > 0) {
      setPercent((prevPercent) => ({
        ...prevPercent,
        [key]: prevPercent[key] - 1,
      }));
    }
  };

  const handleRate = (num) => {
    setPercent((prevPercent) => ({
      ...prevPercent,
      ["rate"]: num,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPercent((prevPercent) => ({
      ...prevPercent,
      ["content"]: value,
    }));
  };

  const handleSubmit = (e) => {
    if (percent.content !== "" && percent.rate !== 0) {
      const response = writereview(percent);
      navigate(-1);
    } else {
      toast.success(`다채워라`, {
        position: "top-center",
      });
    }
  };

  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.header}>
        <div className={styles.header1} onClick={() => navigate(-1)}>
          취소
        </div>
        <div className={styles.header2}>리뷰작성</div>
        <div className={styles.header3} onClick={() => handleSubmit()}>
          완료
        </div>
      </div>
      <div className={styles.exp}>
        내가 생각하는 {cocktail.name}의 맛을 알려주세요.
      </div>
      {taste.map((ele, i) => (
        <div key={i} className={styles.box}>
          <div className={styles.text_box}>
            <div className={styles.text}>{ele[0]}</div>
            <div className={styles.sub_text}>
              <p>{ele[0]}의 정도를</p>
              <p> 0%에서 100%로 골라주세요.</p>
            </div>
          </div>
          <img
            src={minus2}
            alt="minus"
            className={s(styles.minus, percent[ele[1]] === 0 && styles.none)}
            onClick={() => handleDecrement(ele[1])}
          />
          <div className={styles.percent}>{percent[ele[1]] * 20}%</div>
          <img
            src={plus2}
            alt="plus"
            className={s(styles.plus, percent[ele[1]] === 5 && styles.none)}
            onClick={() => handleIncrement(ele[1])}
          />
        </div>
      ))}
      <div className={styles.exp2}>평가에 따라 칵테일취향에 반영됩니다.</div>
      <div className={styles.textareaCover}>
        <div className={styles.title}>한줄평가</div>
        <textarea
          placeholder="리뷰를 작성해 주세요."
          className={styles.textarea}
          value={percent.content}
          onChange={handleChange}
        />
      </div>
      <div className={styles.rateCover}>
        <div className={styles.title}>별점</div>
        <div className={styles.star}>
          <img
            src={percent.rate >= 1 ? star : noneStar}
            alt="star"
            onClick={() => handleRate(1)}
          />
          <img
            src={percent.rate >= 2 ? star : noneStar}
            alt="star"
            onClick={() => handleRate(2)}
          />
          <img
            src={percent.rate >= 3 ? star : noneStar}
            alt="star"
            onClick={() => handleRate(3)}
          />
          <img
            src={percent.rate >= 4 ? star : noneStar}
            alt="star"
            onClick={() => handleRate(4)}
          />
          <img
            src={percent.rate >= 5 ? star : noneStar}
            alt="star"
            onClick={() => handleRate(5)}
          />
        </div>
      </div>
      <div className={styles.ddd}></div>
    </Container>
  );
}
