import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import useUserStore from "../../store/useUserStore";
import profile from "../../assets/common/profile.png";
import arrow from "../../assets/common/arrow3.png";
import close from "../../assets/common/close.png";
import styles from "./SettingsPage.module.css";
import s from "classnames";
import { useState } from "react";
import FileInput from "../../components/common/FileInput";
import { changePassword, changeNickname, changeImg } from "../../api/Member";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import Cocktail1 from "../../assets/lottie/Cocktail1.json";
import toast, { Toaster } from "react-hot-toast";

export default function SettingsPage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [modal, setModal] = useState([false, false, false]);
  const [frameimgurl, setFrameimgurl] = useState(user.profileImageUrl);
  const [value, setValue] = useState({});
  const [data, setData] = useState(user);
  const [password, setPassword] = useState({
    pw: "",
    check: "",
    originpw: "",
    nickname: "",
  });
  const [errorMessage, setErrorMessage] = useState(
    "소문자,숫자 필수 / 대문자,특수문자 선택 / 5~20글자"
  );
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState(
    "대소문자, 한글, 숫자, _(언더바) 입력가능 / 3~10글자 "
  );
  const [loading, setLoading] = useState(false);
  const handleChangePw = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (password.pw !== value && password.check !== "") {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else if (password.pw === "") {
      setErrorMessage("소문자,숫자 필수 / 대문자,특수문자 선택 / 최소 5글자");
    } else if (password.check !== "") {
      setErrorMessage("일치! 구웃");
    }
  };
  const handleChangeValue = (name, value) => {
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const submitImg = async () => {
    if (value.frameImage !== null) {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", value.frameImage);

      try {
        const frameImageURL = await changeImg(formData);
        await setUser({ ...data, profileImageUrl: frameImageURL.data });
        toast.success(`이미지변경 성공 !`, {
          position: "top-center",
        });
      } catch (error) {
        toast.error(`이미지변경 실패`, {
          position: "top-center",
        });
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
        setModal([false, false, false]);
      }
    }
  };

  const submitPassword = async () => {
    const newPassword = {
      originPassword: password.originpw,
      newPassword: password.pw,
    };
    const res = await changePassword(newPassword);
    if (res.status === "ERROR") {
      setErrorMessage(res.message);
    } else {
      setModal([false, false, false]);
      setPassword({
        pw: "",
        check: "",
        originpw: "",
        nickname: "",
      });
    }
  };
  const submitNickname = async () => {
    const newName = {
      name: password.nickname,
    };
    const res = await changeNickname(newName);
    if (res.status === "FAILED" || res.status === "ERROR") {
      setNicknameErrorMessage(
        res.status === "FAILED" ? res.errors[0].message : res.message
      );
    } else {
      await setUser({ ...data, nickname: password.nickname }); // setUser 함수가 완료될 때까지 기다림
      setPassword({
        pw: "",
        check: "",
        originpw: "",
        nickname: "",
      });
      setModal([false, false, false]);
    }
  };
  return (
    <Container>
      <Headerwb title={"계정 설정"} />
      <Toaster position="top-center" />
      {loading && (
        <div className={styles.로딩}>
          <Lottie animationData={Cocktail1} className={styles.lottie} />
        </div>
      )}
      <div className={styles.box}></div>
      <div className={styles.box2}>
        <div
          className={styles.img_box}
          onClick={() => setModal([false, false, true])}
        >
          <img src={user.profileImageUrl} alt="url" className={styles.img} />
        </div>
        <div
          className={styles.item}
          onClick={() => setModal([false, false, true])}
        >
          <div className={styles.변경박스}>
            <div className={styles.item_text}>프로필사진 변경</div>
            <div className={styles.item_subtext}>
              5MB이하 사진만 가능합니다.
            </div>
          </div>
          <img src={arrow} alt="arrow" className={styles.icon} />
        </div>
        <div
          className={styles.item}
          onClick={() => setModal([true, false, false])}
        >
          <div className={styles.변경박스}>
            <div className={styles.item_text}>닉네임 변경</div>
            <div className={styles.item_subtext}>{user.nickname}</div>
          </div>
          <img src={arrow} alt="arrow" className={styles.icon} />
        </div>
        <div
          className={styles.item}
          onClick={() => setModal([false, true, false])}
        >
          <div className={styles.변경박스}>
            <div className={styles.item_text}>비밀번호 변경</div>
            <div className={styles.item_subtext}>
              보안을 위해 3개월에 1번 변경 권장
            </div>
          </div>
          <img src={arrow} alt="arrow" className={styles.icon} />
        </div>
        <div className={styles.btn} onClick={() => navigate(-1)}>
          완료
        </div>
      </div>

      <div
        className={s(
          styles.blur,
          modal[0] || modal[1] || modal[2] ? styles.active : styles.no
        )}
        onClick={() => setModal([false, false, false])}
      ></div>

      <div className={s(styles.modal, !modal[0] && styles.none)}>
        <div className={styles.flex}>
          <img
            src={close}
            alt="close"
            className={styles.icon}
            onClick={() => setModal([false, false, false])}
          />
          <div className={styles.title}>닉네임변경</div>
          <div className={styles.icon}></div>
        </div>
        <div className={styles.subtitle}>새로운 닉네임 입력</div>
        <div className={styles.input_box}>
          <input
            placeholder={user.nickname}
            className={styles.input}
            autocomplete="new-text"
            name="nickname"
            value={password.nickname}
            onChange={handleChangePw}
          />
        </div>
        <div className={styles.error}>{nicknameErrorMessage}</div>
        <div className={styles.btn2} onClick={() => submitNickname()}>
          확인
        </div>
      </div>
      <div className={s(styles.modal, !modal[1] && styles.none)}>
        <div className={styles.flex}>
          <img
            src={close}
            alt="close"
            className={styles.icon}
            onClick={() => setModal([false, false, false])}
          />
          <div className={styles.title}>비밀번호변경</div>
          <div className={styles.icon}></div>
        </div>
        <div className={styles.subtitle}>새로운 비밀번호입력</div>

        <input
          type="password"
          placeholder="기존 비밀번호 입력"
          className={styles.pw}
          name="originpw"
          value={password.originpw}
          onChange={handleChangePw}
          autocomplete="new-password"
        />
        <input
          type="password"
          placeholder="새 비밀번호 입력"
          className={styles.pw}
          name="pw"
          value={password.pw}
          onChange={handleChangePw}
          autocomplete="new-password"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className={styles.pw}
          name="check"
          value={password.check}
          onChange={handleChangePw}
          autocomplete="new-password"
        />

        <div className={styles.error}>{errorMessage}</div>
        <div className={styles.btn2} onClick={() => submitPassword()}>
          확인
        </div>
      </div>
      <div className={s(styles.modal, !modal[2] && styles.none)}>
        <div className={styles.flex}>
          <img
            src={close}
            alt="close"
            className={styles.icon}
            onClick={() => setModal([false, false, false])}
          />
          <div className={styles.title}>프로필사진 변경</div>
          <div className={styles.icon}></div>
        </div>
        <div className={styles.profile_box}>
          <FileInput
            className={styles.profile}
            name="frameImage"
            value={value.frameImage}
            onChange={handleChangeValue}
            initialPreview={frameimgurl}
          />
        </div>
        <div className={styles.btn2} onClick={() => submitImg()}>
          확인
        </div>
      </div>
    </Container>
  );
}
