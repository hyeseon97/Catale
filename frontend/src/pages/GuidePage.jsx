import Container from "../components/common/Container";
import styles from "./GuidePage.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 가이드1 from "../assets/guide/가이드1.jpg";
import 가이드2 from "../assets/guide/가이드2.jpg";
import 가이드3 from "../assets/guide/가이드3.jpg";
import 가이드4 from "../assets/guide/가이드4.jpg";
import 가이드5 from "../assets/guide/가이드5.jpg";
import 가이드6 from "../assets/guide/가이드6.jpg";
import 가이드7 from "../assets/guide/가이드7.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function GuidePage() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setList([가이드1, 가이드2, 가이드3, 가이드4, 가이드5, 가이드6, 가이드7]);
  }, []);

  return (
    <Container>
      <div className={styles.flex}>
        <div className={styles.사용법}>캣테일 사용법</div>
        <div className={styles.가이드북}>
          <Swiper
            className={styles.swiper}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            modules={[Pagination, Navigation]}
            pagination={{
              type: "fraction",
            }}
            navigation={true}
          >
            <SwiperSlide>
              <img src={list[0]} alt="" className={styles.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={list[1]} alt="" className={styles.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={list[2]} alt="" className={styles.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={list[3]} alt="" className={styles.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={list[4]} alt="" className={styles.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={list[5]} alt="" className={styles.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={list[6]} alt="" className={styles.img} />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className={styles.고양이대화} onClick={() => navigate(`/bar`)}>
          고양이랑 대화하러가기
        </div>
      </div>
    </Container>
  );
}
