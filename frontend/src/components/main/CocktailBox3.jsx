import { useState } from "react";
import styles from "./CocktailBox3.module.css";
import glass1 from "../../assets/glass/glass1.png";
import glass2 from "../../assets/glass/glass2.png";
import glass3 from "../../assets/glass/glass3.png";
import glass4 from "../../assets/glass/glass4.png";
import glass5 from "../../assets/glass/glass5.png";
import glass6 from "../../assets/glass/glass6.png";
import glass7 from "../../assets/glass/glass7.png";
import checkimg from "../../assets/icon/체크이미지.png";

export default function CocktailBox3({ cocktail, setFormData, formData }) {
  const isCocktailSelected = formData.includes(cocktail.id);

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

  const handleItemClick = () => {
    if (!isCocktailSelected) {
      setFormData((prevFormData) => [...prevFormData, cocktail.id]);
    } else {
      setFormData((prevFormData) =>
        prevFormData.filter((id) => id !== cocktail.id)
      );
    }
  };

  return (
    <div className={styles.item} onClick={handleItemClick}>
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
      />
      {isCocktailSelected && (
        <img src={checkimg} className={styles.체크이미지} alt="" />
      )}
      <div className={styles.text}>{cocktail.name}</div>
    </div>
  );
}
