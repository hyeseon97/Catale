import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import s from "classnames";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./CocktailDetailPage.module.css";
import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import CocktailDetail from "../../components/diary/CocktailDetail";
import Popup from "../../components/common/Popup";
import Review from "../../components/review/Review";
import like from "../../assets/common/like.png";
import close from "../../assets/common/close.png";
import noneLike from "../../assets/common/noneLike.png";
import review from "../../assets/common/review.png";
import glass1 from "../../assets/glass/glass1.png";
import glass2 from "../../assets/glass/glass2.png";
import glass3 from "../../assets/glass/glass3.png";
import glass4 from "../../assets/glass/glass4.png";
import glass5 from "../../assets/glass/glass5.png";
import glass6 from "../../assets/glass/glass6.png";
import glass7 from "../../assets/glass/glass7.png";
import useCocktailStore from "../../store/useCocktailStore";
import { useEffect, useState } from "react";
import { cocktaildetail } from "../../api/Cocktail";
import { cocktaillike } from "../../api/Cocktail";
import { deletereview, getreview } from "../../api/Review";
import { markerdataB, markerdataG } from "../../components/map/data/markerData";
import { useNavigate } from "react-router-dom";

export default function CocktailDetailPage() {
  const navigate = useNavigate();
  const { cocktailId } = useParams();
  const setCocktail = useCocktailStore((state) => state.setCocktail);
  const cocktail = useCocktailStore((state) => state.cocktail);
  const [nowlike, setNowlike] = useState(true);
  const [modal, setModal] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [select, setSelect] = useState(-1);
  const [storedata, setStoredata] = useState([...markerdataB, ...markerdataG]);

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
    setNowlike(!nowlike);
    cocktaillike(cocktail.id);
  };

  // cocktail.glass 값과 num 배열의 인덱스를 검증합니다.
  const validGlassIndex = cocktail.glass >= 0 && cocktail.glass < num.length;
  const numIndex = validGlassIndex ? cocktail.glass : 0;

  // linear-gradient를 위한 스타일 문자열을 생성합니다.
  const glassCoverStyle = `linear-gradient(180deg, ${cocktail.color3} ${num[numIndex][0]}%, ${cocktail.color2} ${num[numIndex][1]}%, ${cocktail.color1} ${num[numIndex][2]}%, ${cocktail.color1} 100%)`;

  useEffect(() => {
    const fetchData = async () => {
      const cocktails = await cocktaildetail(cocktailId);
      const review = await getreview(cocktails.data.id);
      setReviewList(review.data);
      setCocktail(cocktails.data);
      setNowlike(cocktails.data.like);
    };

    fetchData();

    return () => {
      // cleanup logic
    };
  }, []);

  const toggleDelete = (id) => {
    deletereview(id);
    const updatedReviews = reviewList.filter((review) => review.id !== id); // 삭제한 리뷰를 제외한 새로운 리스트 생성
    setReviewList(updatedReviews); // 상태 업데이트하여 화면 다시 렌더링
  };

  return (
    <Container>
      <Headerwb
        title={cocktail.name}
        children={
          <>
            <img
              src={nowlike ? like : noneLike}
              alt="like"
              className={styles.like}
              onClick={() => toggleLike()}
            />
          </>
        }
      />
      <div className={styles.top}>
        <Swiper
          className={styles.swiper}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide>
            <div
              className={styles.img}
              style={{
                background: `url("${cocktail.imageUrl}") no-repeat center/cover`,
              }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={styles.glass_cover}
              style={{
                background: glassCoverStyle,
              }}
            >
              <img
                src={glasses[cocktail.glass]}
                alt="glass"
                className={styles.glass}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div
        className={styles.background}
        style={{
          background: `linear-gradient(135deg, ${cocktail.color1} 0%,  ${cocktail.color2} 50%, ${cocktail.color3} 100%)`,
        }}
      >
        <div className={styles.cover}>
          <div className={styles.content}>{cocktail.content}</div>
          <div className={styles.chart}>
            <CocktailDetail cocktail={cocktail} btn={false} />
          </div>
          <div className={styles.ingredient}>{cocktail.ingredient}</div>

          {cocktail &&
            cocktail.storeIdList &&
            cocktail.storeIdList.length !== 0 && (
              <>
                <div className={styles.판매중인칵테일바}>판매중인 칵테일바</div>
                <div className={styles.가게모음집}>
                  {cocktail.storeIdList.map((storeId) => {
                    // markerdataB와 markerdataG를 합친 배열에서 해당 가게 정보 찾기
                    const storeInfo = storedata.find(
                      (store) => store.number === storeId
                    );
                    // 해당 가게 정보가 있을 때 가게 이름 출력
                    if (storeInfo) {
                      return (
                        <div
                          className={styles.가게하나}
                          key={storeInfo.number}
                          onClick={() =>
                            navigate(`../../map/detail/${storeInfo.number}`)
                          }
                        >
                          <div
                            className={styles.가게사진}
                            style={{
                              background: `url("${storeInfo.url}") no-repeat center/cover`,
                            }}
                          ></div>
                          <div className={styles.가게이름}>
                            {storeInfo.title}
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </>
            )}

          <div className={styles.review}>{cocktail.name} 리뷰</div>
          <div>
            <Review
              list={reviewList}
              setModal={setModal}
              setSelect={setSelect}
            />
          </div>
        </div>
      </div>
      <div className={styles.popup}>
        <Popup
          img={review}
          subText={`${cocktail.name}를(을) 드신적이 있나요?`}
          text={"리뷰 작성하러 가기"}
          src={"review"}
        />
      </div>
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
          <div className={styles.delete_title}>리뷰삭제</div>
          <div className={styles.icon}></div>
        </div>
        <div className={styles.delete_text}>해당 리뷰를 삭제하시겠습니까?</div>
        <div className={styles.delete_bottom}>
          <div className={styles.delete_cancel} onClick={() => setModal(false)}>
            취소
          </div>
          <div
            className={styles.delete_delete}
            onClick={() => {
              toggleDelete(select);
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
