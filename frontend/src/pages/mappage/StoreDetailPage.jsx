import Container from "../../components/common/Container";
import styles from "./StoreDetailPage.module.css";
import Map from "../../components/map/map";
import StoreInfo from "../../components/map/StoreInfo";
import { useParams, useNavigate } from "react-router-dom";
import { markerdataB, markerdataG } from "../../components/map/data/markerData";
import Headerwb from "../../components/common/Headerwb";
import { getstoredetail } from "../../api/Store";
import { useState, useEffect } from "react";
import Storepicture from "../../components/map/Storepicture";
import Storemenu from "../../components/map/Storemenu";

export default function StoreDetailPage() {
  const { storenumber } = useParams();
  // 봉명동과 궁동의 데이터를 병합합니다.
  const allData = [...markerdataB, ...markerdataG];

  // storenumber에 해당하는 칵테일바 데이터를 찾습니다.
  const selectedStore = allData.find(
    (store) => store.number === parseInt(storenumber)
  );

  const [storedata, setStoredata] = useState();
  const [menus, setMenus] = useState();
  const [images, setImages] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getstoredetail(storenumber);
      setStoredata(response);
      setMenus(response.menus);
      setImages(response.images);
    };
    fetchData();
  }, [storenumber]);

  const nowlocatex = selectedStore.lat;
  const nowlocatey = selectedStore.lng;
  const click = (number) => {};
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Headerwb title={selectedStore.title} />
        <Map
          nowlocatex={nowlocatex}
          nowlocatey={nowlocatey}
          level="1"
          markerData={selectedStore.selectedStore}
          setNowclick={click}
        />
        {storedata && menus && images && (
          <>
            <StoreInfo selectedStore={selectedStore} storedata={storedata} />
            <Storepicture images={images} storenumber={storenumber} />
            <Storemenu
              menus={menus}
              storenumber={storenumber}
              storename={selectedStore.title}
            />
          </>
        )}
      </Container>
    </>
  );
}
