import styles from "./Storepicture.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Storepicture({ images, storenumber }) {
  return (
    <>
      <div className={styles.picturemain}>
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
            <img src={images[0]} alt="" className={styles.img} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={images[1]} alt="" className={styles.img} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={images[2]} alt="" className={styles.img} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
