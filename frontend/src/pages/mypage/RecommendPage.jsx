import { useEffect, useState } from "react";
import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import styles from "./RecommendPage.module.css";
import Medallist from "../../components/search/Medallist";
import Nonmedallist from "../../components/search/Nonmedallist";
import { recommendcocktails } from "../../api/Cocktail";
import useUserStore from "../../store/useUserStore";
export default function RecommendPage() {
  const [list, setList] = useState([]);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    async function fetchlikeData() {
      try {
        const response = await recommendcocktails();
        console.log(response);
        setList(response.data);
      } catch (error) {
        console.error("데이터불러오기실패");
      }
    }
    fetchlikeData();
  }, []);

  return (
    <Container>
      <Headerwb title={"나의 취향"} />
      <div className={styles.title}>
        <div className={styles.main_title}>오늘의 추천</div>
        <div className={styles.sub_title}>
          {user.nickname} 님의 취향을 기반으로 추천하는 칵테일입니다.
        </div>
      </div>
      <div className={styles.검색결과}>
        {list.map((data, index) => (
          <>
            {index === 0 && (
              <Medallist
                key={index}
                index={index}
                response={data}
                setList={setList}
              />
            )}
            {index !== 0 && (
              <Nonmedallist
                key={index}
                index={index}
                response={data}
                setList={setList}
              />
            )}
          </>
        ))}
      </div>
    </Container>
  );
}
