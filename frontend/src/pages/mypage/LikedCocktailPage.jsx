import { useEffect, useState } from "react";
import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import CocktailBox from "../../components/main/CocktailBox";
import styles from "./LikedCocktailPage.module.css";
import { cocktailmelike } from "../../api/Cocktail";
import useUserStore from "../../store/useUserStore";

export default function LikedCocktailPage() {
  const user = useUserStore((state) => state.user);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchlikeData() {
      try {
        const response = await cocktailmelike(user.memberId);
        setList([...list, ...response.data]);
      } catch (error) {
        console.error("데이터불러오기실패");
      }
    }
    fetchlikeData();
  }, [page]);

  return (
    <Container>
      <Headerwb title={"좋아하는 칵테일"} />
      <div className={styles.main}>
        {list.length == 0 && <>아직 좋아요 한 칵테일이 없어요 !</>}
        {list.map((cocktail) => (
          <CocktailBox
            cocktail={cocktail}
            key={cocktail.id}
            setList={setList}
          />
        ))}
      </div>
    </Container>
  );
}
