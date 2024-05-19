import Container from "../../components/common/Container";
import Header from "../../components/common/Header";
import Headerwb from "../../components/common/Headerwb";
import Nav from "../../components/common/Nav";
import styles from "./DeleteAccountPage.module.css";

export default function DeleteAccountPage() {
  return (
    <Container>
      <Headerwb title={"계정 탈퇴"} />
      <div className={styles.main}>
        계정탈퇴를 원하시면 b306 심규리 교육생에게 전화주시면
        <br />
        친철히 db에서 삭제를 진행해 드립니다.
        <br />
        감사합니다.
        <br />
        010-9891-3512
      </div>
    </Container>
  );
}
