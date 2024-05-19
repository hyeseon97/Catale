import { useEffect, useState } from "react";
import {
  getcocktaillist,
  cocktailsearchname,
  cocktailsearchoption,
} from "../api/Cocktail";
import Container from "../components/common/Container";
import styles from "./SearchPage.module.css";
import Nav from "../components/common/Nav";
import Header from "../components/common/Header";
import CocktailBox2 from "../components/main/CocktailBox2";
import 이퀄 from "../assets/icon/이퀄라이저.png";
import 돋보기 from "../assets/icon/검색돋보기.png";
import arrow from "../assets/common/arrow1.png";
import checkimg from "../assets/common/check.png";
import { base } from "../components/data/base";
import s from "classnames";
import Searchoption from "../components/search/Searchoption";
import { alctalk, opttalk } from "../components/data/searchtalk";
import useSearchStore from "../store/useSearchStore";
import Medallist from "../components/search/Medallist";
import Nonmedallist from "../components/search/Nonmedallist";

export default function SearchPage() {
  const setSearchTrue = useSearchStore((state) => state.setSearchTrue);
  const setCocktailList = useSearchStore((state) => state.setCocktailList);

  const check = useSearchStore((state) => state.searchtrue);
  const cocktail = useSearchStore((state) => state.cocktail);

  const [searchcheck, setSearchcheck] = useState(false);
  const [list, setList] = useState([]);
  const [searchlist, setSearchlist] = useState([]);
  const [searchname, setSearchname] = useState("");
  const [modal, setModal] = useState(false);
  const [options, setOptions] = useState({
    base: -1,
    alc: 0,
    sweet: 0,
    sour: 0,
    bitter: 0,
    sparkling: 0,
  });
  const [optionstrue, setOptionstrue] = useState({
    base: true,
    alc: false,
    sweet: false,
    sour: false,
    bitter: false,
    sparkling: false,
  });

  const clicknonbase = () => {
    setOptions({ ...options, base: -1 });
    setOptionstrue({ ...optionstrue, base: true });
  };
  const clickbase = (index) => {
    setOptions({ ...options, base: index });
    setOptionstrue({ ...optionstrue, base: false });
  };

  const handlesearch = async () => {
    try {
      const response = await cocktailsearchname(searchname);
      if (response.status === "SUCCESS") {
        setSearchlist(response.data);
        setCocktailList(response.data);
        setSearchTrue(true);
        setSearchcheck(true);
      } else {
        console.log("에러난듯");
      }
    } catch (e) {
      console.log("에러남222");
    }
  };

  const handleeq = async () => {
    try {
      const newOptions = { ...options };
      for (const key in optionstrue) {
        if (optionstrue[key]) {
          newOptions[key] = -1;
        }
      }
      const response = await cocktailsearchoption(newOptions);
      if (response.status === "SUCCESS") {
        setSearchlist(response.data);
        setCocktailList(response.data);
        setSearchTrue(true);
        setSearchcheck(true);
        setModal(false);
      } else {
        console.log("에러난듯");
      }
    } catch (e) {
      console.log("에러남222");
    }
  };

  useEffect(() => {
    setSearchlist(cocktail);
    async function fetchlistData() {
      const formData = { page: 0, size: 30 };
      try {
        const response = await getcocktaillist(formData);
        setList([...list, ...response.data]);
      } catch (error) {
        console.error("데이터불러오기실패");
      }
    }
    fetchlistData();
  }, []);

  const handleChange = (e) => {
    setSearchname(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handlesearch();
    }
  };

  return (
    <Container>
      <Header>검색</Header>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.검색창}>
            <img
              className={styles.돋보기}
              src={돋보기}
              alt=""
              onClick={() => handlesearch()}
            />
            <input
              className={styles.검색인풋창}
              type="text"
              value={searchname}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <img
            className={styles.이퀄}
            src={이퀄}
            alt=""
            onClick={() => setModal(true)}
          />
        </div>

        {check && (
          <>
            <div className={styles.검색했을때}>
              <div className={styles.검색결과폰트}>검색결과</div>
              <div className={styles.검색결과}>
                {searchlist.map((data, index) => (
                  <CocktailBox2
                    key={index}
                    cocktail={data}
                    setList={setSearchlist}
                    searchlist={searchlist}
                    setCocktailList={setCocktailList}
                  />
                ))}
                {searchlist.length === 0 && (
                  <>
                    <div>검색결과가 없어용 ㅠㅠ</div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
        {!check && (
          <>
            <div className={styles.검색했을때}>
              <div className={styles.검색결과폰트2}>인기칵테일</div>
              <div className={styles.검색결과베이비폰트}>
                순위는 칵테일의 좋아요 갯수로 정해집니다.
              </div>
              <div className={styles.검색결과}>
                {list.map((data, index) => (
                  <>
                    {index === 0 && (
                      <Medallist
                        key={index}
                        index={index}
                        response={data}
                        setList={setList}
                      />
                    )}
                    {index !== 0 && (
                      <Nonmedallist
                        key={index}
                        index={index}
                        response={data}
                        setList={setList}
                      />
                    )}
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className={s(styles.blur, modal ? styles.active : styles.no)}
        onClick={() => setModal(false)}
      ></div>
      <div className={s(styles.modal, !modal && styles.none)}>
        <div className={styles.option_top}>
          <img
            src={arrow}
            alt="arrow"
            className={styles.arrow}
            onClick={() => setModal(false)}
          />
          <div className={styles.option_title}>옵션</div>
          <div className={styles.arrow}></div>
        </div>
        <div className={styles.option}>
          <div className={styles.option_text}>
            <div
              className={
                optionstrue.base ? styles.베이스술상관노 : styles.베이스술
              }
            >
              베이스술
            </div>
            <div className={styles.option_not}>
              <img src={checkimg} alt="check" className={styles.icon} />
              <div
                className={
                  optionstrue.base ? styles.redcolor : styles.whitecolor
                }
                onClick={() => clicknonbase()}
              >
                상관없음
              </div>
            </div>
          </div>
          <div
            className={optionstrue.base ? styles.nonbase_box : styles.base_box}
          >
            {base.map((ele, index) => {
              if (ele !== "") {
                return (
                  <div
                    className={s(
                      options.base === -1 ? styles.nonbase : styles.base,
                      {
                        [styles.selected]: options.base === index,
                      }
                    )}
                    onClick={() => clickbase(index)}
                  >
                    {ele}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <Searchoption
          key="alc"
          searchopt={options.alc}
          setSearchopt={setOptions}
          optionstrue={optionstrue.alc}
          setOptionstrue={setOptionstrue}
          optionKey="alc"
          talk={alctalk}
          title="도수"
        />
        <Searchoption
          key="sweet"
          searchopt={options.sweet}
          setSearchopt={setOptions}
          optionstrue={optionstrue.sweet}
          setOptionstrue={setOptionstrue}
          optionKey="sweet"
          talk={opttalk}
          title="단맛"
        />
        <Searchoption
          key="sour"
          searchopt={options.sour}
          setSearchopt={setOptions}
          optionstrue={optionstrue.sour}
          setOptionstrue={setOptionstrue}
          optionKey="sour"
          talk={opttalk}
          title="신맛"
        />
        <Searchoption
          key="bitter"
          searchopt={options.bitter}
          setSearchopt={setOptions}
          optionstrue={optionstrue.bitter}
          setOptionstrue={setOptionstrue}
          optionKey="bitter"
          talk={opttalk}
          title="쓴맛"
        />
        <Searchoption
          key="sparkling"
          searchopt={options.sparkling}
          setSearchopt={setOptions}
          optionstrue={optionstrue.sparkling}
          setOptionstrue={setOptionstrue}
          optionKey="sparkling"
          talk={opttalk}
          title="탄산"
        />
        <div className={styles.검색하기} onClick={() => handleeq()}>
          검색하기
        </div>
      </div>

      <div onClick={() => setSearchTrue(false)}>
        <Nav num={1} />
      </div>
    </Container>
  );
}
