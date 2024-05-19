// 지도 탭에 해당하는 페이지입니다.

import Container from "../../components/common/Container";
import styles from "./MapPage.module.css";
import Map from "../../components/map/map";
import Header from "../../components/common/Header";
import Nav from "../../components/common/Nav";
import Storebox from "../../components/map/Storebox";
import { markerdataB, markerdataG } from "../../components/map/data/markerData";
import { useState } from "react";

export default function MapPage() {
  //지도에서 어떤마커를 선택했는지.
  const [nowclick, setNowclick] = useState();

  return (
    <>
      <Container>
        <Header>
          <div className={styles.지역이름}>유성구</div>
          <div>근처</div>
        </Header>
        <div className={styles.되니박스}>
          <div className={styles.map}>
            <Map setNowclick={setNowclick} />
          </div>
          <div className={styles.main}>
            <div className={styles.동이름}>봉명동</div>
            {markerdataB.map((data) => (
              <Storebox
                key={data.number}
                store={data}
                nowclick={nowclick}
                onClick={setNowclick}
              />
            ))}
            <div className={styles.동이름}>궁동</div>
            {markerdataG.map((data) => (
              <Storebox
                key={data.number}
                store={data}
                nowclick={nowclick}
                onClick={setNowclick}
              />
            ))}
          </div>
        </div>
        <Nav num={2} />
      </Container>
    </>
  );
}
