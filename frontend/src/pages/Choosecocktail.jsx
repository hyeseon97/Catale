import Container from "../components/common/Container";
import styles from "./Choosecocktail.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chooselist } from "../api/Member";
import { getcocktaillist } from "../api/Cocktail";
import CocktailBox3 from "../components/main/CocktailBox3";

export default function Choosecocktail() {
  const [formData, setFormData] = useState([]);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18;

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchlistData() {
      try {
        const formData = { page: 0, size: 219 };
        const response = await getcocktaillist(formData);
        setList(response.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Failed to fetch data");
      }
    }
    fetchlistData();
  }, []);

  const totalPages = Math.ceil(list.length / pageSize);

  const paginatedList = list.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const sendDataToServer = async () => {
    try {
      const cocktailIds = formData;
      const response = await chooselist({ cocktailIds });
      if (response.status === "SUCCESS") {
        navigate("../guidePage");
      } else {
        console.log("에러 발생");
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <Container>
      <div className={styles.좋칵}>좋아하는 칵테일을 클릭해주세요 !</div>
      <div className={styles.flex}>
        <div
          className={styles.선택박스}
          onClick={() => {
            console.log(formData);
            sendDataToServer();
          }}
        >
          {formData.length} 개 선택하기
        </div>
      </div>
      {list && (
        <>
          <div className={styles.칵테일전체박스}>
            {paginatedList.map((data) => (
              <div className={styles.칵테일들}>
                <CocktailBox3
                  cocktail={data}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            {currentPage !== 1 && (
              <div onClick={handlePrevPage} disabled={currentPage === 1}>
                이전 페이지
              </div>
            )}
            {currentPage === 1 && (
              <div className={styles.끝페이지}>이전 페이지</div>
            )}
            <span>
              {currentPage} / {totalPages}
            </span>
            {currentPage !== totalPages && (
              <div onClick={handleNextPage}>다음 페이지</div>
            )}
            {currentPage === totalPages && (
              <div className={styles.끝페이지}>다음 페이지</div>
            )}
          </div>
        </>
      )}
    </Container>
  );
}
