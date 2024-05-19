import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import styles from "./MyCocktailPage.module.css";
import s from "classnames";
import arrow_none from "../../assets/common/arrow5.png";
import arrow_active from "../../assets/common/arrow4.png";
import { useState, useEffect } from "react";
import ReviewItem from "../../components/my/ReviewItem";
import { cocktailmereview } from "../../api/Cocktail";

export default function MyCocktailPage() {
  const orderList = [
    "createdAt,desc",
    "createdAt,asc",
    "rate,desc",
    "rate,asc",
  ];

  const [order, setOrder] = useState(true);
  const [rotate, setrotate] = useState([180, 180]);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchlikeData() {
      try {
        const response = await cocktailmereview(orderList[0], page);
        setList([...list, ...response.data]);
      } catch (error) {
        console.error("데이터불러오기실패");
      }
    }
    fetchlikeData();
  }, [page]);

  const changeOrder = async (num) => {
    if (num === 0 && !order) {
      //내가 고른게 날짜순이고 원래는 평점순을 눌러놨었다.
      setOrder(true);
      setrotate([180, 180]);
      const response = await cocktailmereview(orderList[0], 0);
      setList(response.data);
    } else if (num === 1 && order) {
      //내가 고른게 평점순이고 원래는 날짜순을 눌러놨었다.
      setOrder(false);
      setrotate([180, 180]);
      const response = await cocktailmereview(orderList[2], 0);
      setList(response.data);
    } else if (num === 0 && order) {
      //내가 고른게 날짜순이고 날짜순을 눌러놨었다.
      if (rotate[0] === 180) {
        //지금 오름차순이다.
        setrotate([0, 180]);
        const response = await cocktailmereview(orderList[1], 0);
        setList(response.data);
      } else {
        //지금 내림차순이다.
        setrotate([180, 180]);
        const response = await cocktailmereview(orderList[0], 0);
        setList(response.data);
      }
    } else if (num === 1 && !order) {
      //내가 고른게 평점순이고 평점순을 눌러놨었다.
      if (rotate[1] === 180) {
        //지금 오름차순이다.
        setrotate([180, 0]);
        const response = await cocktailmereview(orderList[3], 0);
        setList(response.data);
      } else {
        //지금 내림차순이다.
        setrotate([180, 180]);
        const response = await cocktailmereview(orderList[2], 0);
        setList(response.data);
      }
    }
  };

  return (
    <Container>
      <Headerwb title={"내가 마신 칵테일"} />
      <div className={styles.main}>
        <div className={styles.order}>
          <div className={styles.order_item} onClick={() => changeOrder(0)}>
            <div
              className={s(
                styles.order_text,
                order ? styles.active_order : styles.none_order
              )}
            >
              날짜순
            </div>
            <img
              src={order ? arrow_active : arrow_none}
              alt="arrow"
              className={styles.order_img}
              style={{ transform: `rotate(${rotate[0]}deg)` }}
            />
          </div>
          <div className={styles.order_item} onClick={() => changeOrder(1)}>
            <div
              className={s(
                styles.order_text,
                !order ? styles.active_order : styles.none_order
              )}
            >
              평점순
            </div>
            <img
              src={!order ? arrow_active : arrow_none}
              alt="arrow"
              className={styles.order_img}
              style={{ transform: `rotate(${rotate[1]}deg)` }}
            />
          </div>
        </div>
        <div>
          {list.map((item) => (
            <div className={styles.item}>
              <ReviewItem item={item} setList={setList} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
