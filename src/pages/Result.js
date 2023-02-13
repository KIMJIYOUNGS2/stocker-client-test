import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Result.module.css";
import axios from "axios";
import useMbti from "../hooks/useMbti";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

// 2023-02-11 이후 추가된 import
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useScript } from "../hooks/Kakao";
import kakaoLogo from "../static/images/kakao.png";
import MetaTag from "../helper/MetaTag";
import Modal from "../components/Modal";

function Result() {
  const navigate = useNavigate();
  const [kind, setKind] = useState();
  const [content, setContent] = useState();
  const [surmmary, setSurmmary] = useState();
  const [similar, setSimilar] = useState();
  const [worst, setWorst] = useState();
  const { mbti, setMbti, raw, setRaw } = useMbti();
  const [init, setInit] = useState(0);
  const [ModalisOpen, setModalIsOpen] = useState(false);

  // info modal
  const onClickButton = () => {
    setModalIsOpen(true);
  };

  // 첫 화면이 공유 링크가 되도록 설정 (나중에는 배포한 도메인으로 수정예정)
  const shareUrl = window.location.href.replace("result", "");
  console.log(shareUrl);

  // kakao SDK import하기
  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");

  // kakao sdk 초기화하기
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        // init에 카카오 javascript key 입력
        window.Kakao.init("45cd70138fba6be56ebfff3df807aa7c");
      }
    }
  }, [status]);

  const shareKakao = () => {
    window.Kakao.Link.sendCustom({
      templateId: 89914, // 템플릿 아이디 입력
    });
  };

  // api POST - axios.defaults.baseURL = "https://kimduhong.pythonanywhere.com/"
  useEffect(() => {
    if (
      mbti == "" &&
      sessionStorage.getItem("mbti") &&
      sessionStorage.getItem("raw")
    ) {
      setMbti(sessionStorage.getItem("mbti"));
      setRaw(sessionStorage.getItem("raw"));
      console.log(sessionStorage.getItem("mbti"));
      axios
        .post(`api/v1/result/@${sessionStorage.getItem("mbti")}`, {
          answer: sessionStorage.getItem("raw"),
        })
        .then((res) => {
          console.log(res);
          setMbti(res.data.mbti); // mbti: mbti 유형
          setKind(res.data.kind.kind); // kind:개발자 유형
          setSurmmary(res.data.kind.surmmary); // summary:한줄 요약
          setContent(res.data.kind.content); // content:유형에 대한 설명
          setSimilar(res.data.kind.similar); // similar: 가장 잘 맞는 유형
          setWorst(res.data.kind.worst); // worst: 가장 잘 맞지 않는 유형
          setInit(1);
        })
        .catch((err) => err);
    } else if (!mbti == "" && !raw == "") {
      axios
        .post(`api/v1/result/@${mbti}`, { answer: raw })
        .then((res) => {
          console.log(res);

          setMbti(res.data.mbti); // mbti: mbti 유형
          setKind(res.data.kind.kind); // kind:개발자 유형
          setSurmmary(res.data.kind.surmmary); // summary:한줄 요약
          setContent(res.data.kind.content); // content:유형에 대한 설명
          setSimilar(res.data.kind.similar); // similar: 가장 잘 맞는 유형
          setWorst(res.data.kind.worst); // worst: 가장 잘 맞지 않는 유형
          setInit(1);
        })
        .catch((err) => err);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.div}>
      <MetaTag />
      {init ? (
        <>
          <div className={styles.surmmary}>{surmmary}</div>
          <div className={styles.header}>
            당신은 <span className={styles.text_under}>&nbsp;{kind}&nbsp;</span>{" "}
            유형입니다.
          </div>
          <div className={styles.content_container}>
            <div className={styles.content}>{content}</div>
            <Type>
              <div className={styles.content}>
                당신과 잘 맞는 유형은{" "}
                <span className={styles.text_under2}>{similar}</span>입니다.
              </div>
              <div className={styles.content}>
                당신과 잘 맞지 않는 유형은{" "}
                <span className={styles.text_under2}>{worst}</span>입니다.
              </div>
            </Type>
          </div>
          <div className="button_group">
            <div>
              <button className={styles.button1} onClick={() => navigate("/")}>
                Retry
              </button>

              {/* <button className={styles.button1} onClick={Alert}>
                share
              </button> */}
            </div>
            <div>
              {/* react modal 가운데에 뜨게 */}
              <FlexContainer>
                <GridContainer>
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon
                      size={48}
                      round={true}
                      borderRadius={24}
                    ></FacebookIcon>
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon
                      size={48}
                      round={true}
                      borderRadius={24}
                    ></TwitterIcon>
                  </TwitterShareButton>
                  <CopyToClipboard text={shareUrl}>
                    <URLShareButton>URL</URLShareButton>
                  </CopyToClipboard>
                  <KakaoShareButton onClick={shareKakao}>
                    <KakaoIcon src={kakaoLogo}></KakaoIcon>
                  </KakaoShareButton>
                </GridContainer>
              </FlexContainer>
            </div>
          </div>
          {/* ===========추가 부분===================== */}
          <ModalWrap>
            <InfoButton onClick={onClickButton}>Info</InfoButton>
            {ModalisOpen && (
              <Modal
                open={ModalisOpen}
                onClose={() => {
                  setModalIsOpen(false);
                }}
              />
            )}
          </ModalWrap>
          {/* ===========추가 부분===================== */}
        </>
      ) : (
        <div className={styles.loading}>Now loading...</div>
      )}
    </div>
  );
}

export default Result;

// 제목과 버튼을 감싸는 컨테이너
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

// 버튼을 배치시키는 컨테이너
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 48px);
  grid-column-gap: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 16px;
`;

const URLShareButton = styled.button`
  width: 46.5px;
  height: 46.5px;
  color: white;
  border-radius: 24px;
  border: 0px;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  background-color: #7362ff;
  
  }
`;
const KakaoShareButton = styled.a`
  cursor: pointer;
`;

const KakaoIcon = styled.img`
  width: 46.5px;
  height: 46.5px;
  border-radius: 24px;
`;

{
  /* ------------------추가 부분--------------- */
}

const InfoButton = styled.button`
  padding: 5px 15px;
  border: 2px solid white;
  background-color: transparent;
  border-radius: 24px;
  color: white;
  cursor: pointer;
  font-size: 2.5vw;
  &:hover {
    background-color: white;
    color: black;
    cursr: pointer;
  }
`;

const ModalWrap = styled.div`
  text-align: center;
  position: absolute;
  right: 3%;
  bottom: 5%;
`;

{
  /* ------------------추가 부분--------------- */
}

const Type = styled.div`
  postion: flex;
`;
