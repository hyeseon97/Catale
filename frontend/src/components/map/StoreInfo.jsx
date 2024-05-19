import Container from "../common/Container";
import styles from "./StoreInfo.module.css";
import IconTel from "../../assets/icon/IconTel.png";
import IconTime from "../../assets/icon/IconTime.png";
import IconInsta from "../../assets/icon/IconInsta.png";
import IconMap from "../../assets/icon/IconMap.png";
import store1 from "../../assets/common/store1.png";
import store2 from "../../assets/common/store2.png";
import store3 from "../../assets/common/store3.png";
import store4 from "../../assets/common/store4.png";
import store5 from "../../assets/common/store5.png";

export default function StoreInfo({ selectedStore, storedata }) {
  // 봉명동과 궁동의 데이터를 병합합니다.
  // 선택된 칵테일바 데이터를 이용하여 원하는 작업을 수행합니다.
  return (
    <>
      <div className={styles.storeInfo}>
        {selectedStore.영업시간 && (
          <div className={styles.box}>
            <img src={IconTime} alt="" />
            <div>
              {selectedStore.영업시간}
              {selectedStore.정기휴무 && (
                <span className={styles.정기휴무}>
                  (정기휴무 : {selectedStore.정기휴무})
                </span>
              )}
            </div>
          </div>
        )}
        {selectedStore.주소 && (
          <div className={styles.box}>
            <img src={IconMap} alt="" />
            <div>{selectedStore.주소}</div>
          </div>
        )}
        {selectedStore.tel && (
          <div className={styles.box}>
            <img src={IconTel} alt="" />
            <div>{selectedStore.tel}</div>
          </div>
        )}
        {selectedStore.insta && (
          <div className={styles.box}>
            <img src={IconInsta} alt="" />
            <div>
              <a href={selectedStore.insta}>instagram</a>
            </div>
          </div>
        )}
        <div className={styles.store_box}>
          {storedata.petAvailable && (
            <div className={styles.store_flex}>
              <img src={store1} alt="store" className={styles.store_img} />
              <div>반려동물 동반</div>
            </div>
          )}
          {storedata.reservationAvailable && (
            <div className={styles.store_flex}>
              <img src={store2} alt="store" className={styles.store_img} />
              <div>예약 가능</div>
            </div>
          )}
          {storedata.groupAvailable && (
            <div className={styles.store_flex}>
              <img src={store3} alt="store" className={styles.store_img} />
              <div>단체손님 가능</div>
            </div>
          )}
          {storedata.wifiAvailable && (
            <div className={styles.store_flex}>
              <img src={store4} alt="store" className={styles.store_img} />
              <div>무선 인터넷</div>
            </div>
          )}
          {storedata.parkAvailable && (
            <div className={styles.store_flex}>
              <img src={store5} alt="store" className={styles.store_img} />
              <div>주차 가능</div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.중간디브} />
    </>
  );
}
