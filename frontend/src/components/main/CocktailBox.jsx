import styles from "./CocktailBox.module.css";
import glass1 from "../../assets/glass/glass1.png";
import glass2 from "../../assets/glass/glass2.png";
import glass3 from "../../assets/glass/glass3.png";
import glass4 from "../../assets/glass/glass4.png";
import glass5 from "../../assets/glass/glass5.png";
import glass6 from "../../assets/glass/glass6.png";
import glass7 from "../../assets/glass/glass7.png";
import like from "../../assets/common/like.png";
import noneLike from "../../assets/common/noneLike.png";
import { cocktaillike } from "../../api/Cocktail";
import { useNavigate } from "react-router-dom";

export default function CocktailBox({ cocktail, setList }) {
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
      prevList.map((item) =>
        item.id === cocktail.id
          ? { ...item, like: !item.like } // 토글 된 경우 like 상태를 반전
          : item
      )
    );
    // 토글된 이후에 cocktaillike 호출
    cocktaillike(cocktail.id ? cocktail.id : cocktail.cocktailId);
  };
  return (
    <div className={styles.item}>
      <img
        src={glasses[cocktail.glass]}
        alt="glass"
        className={styles.glass}
        style={{
          background: `linear-gradient(0deg, ${cocktail.color1} ${
            num[cocktail.glass][0]
          }%, ${cocktail.color2} ${num[cocktail.glass][1]}%, ${
            cocktail.color3
          } ${num[cocktail.glass][2]}%, ${cocktail.color3} 100%)`,
        }}
        onClick={() => navigate(`/cocktail/${cocktail.id}`)}
      />
      <div className={styles.text}>{cocktail.name}</div>
      <img
        src={cocktail.like ? like : noneLike}
        alt="like"
        className={styles.like}
        onClick={toggleLike} // 클릭하면 toggleLike 함수를 호출
      />
    </div>
  );
}
