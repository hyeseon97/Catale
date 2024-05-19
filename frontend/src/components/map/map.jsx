import { useEffect, useRef } from "react";
import styles from "./map.module.css";
import { markerdataB, markerdataG } from "./data/markerData";

function makeInfowindowContent(title) {
  return `
    <div style="padding: 10px; background-color: black; font-size: 1rem;">
        <h2>${title}</h2>
    </div>
  `;
}
const allData = [...markerdataB, ...markerdataG];

export default function Map({
  setNowclick,
  nowlocatex = "36.3599377",
  nowlocatey = "127.34791",
  level = "4",
  markerData = allData,
}) {
  const { kakao } = window;
  const mapRef = useRef(null);

  const mapscript = () => {
    const container = mapRef.current; // mapRef를 통해 요소를 가져옵니다.
    if (!container) return; // 요소가 없으면 함수를 종료합니다.

    const options = {
      center: new kakao.maps.LatLng(nowlocatex, nowlocatey),
      level: level,
    };

    // 지도 생성
    const map = new kakao.maps.Map(container, options);

    // 마커 추가
    markerData.forEach((el) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
      });
      // const infowindow = new kakao.maps.InfoWindow({
      // content: makeInfowindowContent(el.title),
      // });
      // kakao.maps.event.addListener(
      //   marker,
      //   "mouseover",
      //   makeOverListener(map, marker)
      // );
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커 위에 인포윈도우를 표시합니다
        setNowclick(el.number);
      });

      // kakao.maps.event.addListener(
      //   marker,
      //   "mouseout",
      //   makeOutListener(infowindow)
      // );
    });
  };

  useEffect(() => {
    mapscript();
  }, []);

  // 인포윈도우를 표시하는 클로저를 만드는 함수
  // function makeOverListener(map, marker, infowindow) {
  //   return function () {
  //     infowindow.open(map, marker);
  //   };
  // }

  // 인포윈도우를 닫는 클로저를 만드는 함수
  // function makeOutListener(infowindow) {
  //   return function () {
  //     infowindow.close();
  //   };
  // }

  return <div className={styles.map} ref={mapRef}></div>;
}
