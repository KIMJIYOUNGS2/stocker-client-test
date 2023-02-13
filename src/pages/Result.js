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

// 2023-02-11 수정
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useScript } from "../hooks/Kakao";
import kakaoLogo from "../static/images/kakao.png";

function Result() {
  const navigate = useNavigate();
  const [kind, setKind] = useState();
  const [content, setContent] = useState();
  const [surmmary, setSurmmary] = useState();
  const { mbti, setMbti, raw, setRaw } = useMbti();
  const [init, setInit] = useState(0);

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
        // 여기에 발급받은 카카오 javascript key 입력!
        window.Kakao.init("45cd70138fba6be56ebfff3df807aa7c");
      }
    }
  }, [status]);

  // 카카오 공유 버튼 핸들러
  // kakao 링크에서 제공하는 sendScrap 기능을 사용
  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: shareUrl,
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
          setMbti(res.data.mbti); // mbti
          setKind(res.data.kind.kind); // kind:개발자 유형
          setSurmmary(res.data.kind.surmmary); // summary:한줄 요약
          setContent(res.data.kind.content); // content:유형에 대한 설명
          setInit(1);
        })
        .catch((err) => err);
    } else if (!mbti == "" && !raw == "") {
      axios
        .post(`api/v1/result/@${mbti}`, { answer: raw })
        .then((res) => {
          console.log(res);

          setMbti(res.data.mbti); // mbti
          setKind(res.data.kind.kind); // kind:개발자 유형
          setSurmmary(res.data.kind.surmmary); // summary:한줄 요약
          setContent(res.data.kind.content); // content:유형에 대한 설명
          setInit(1);
        })
        .catch((err) => err);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.div}>
      {init ? (
        <>
          <div className={styles.surmmary}>{surmmary}</div>
          <div className={styles.header}>
            당신은 <span className={styles.text_under}>{kind}</span> 유형입니다.
          </div>
          <div className={styles.content_container}>
            <div className={styles.content}>{content}</div>
          </div>
          <div className="button_group">
            <div>
              <button className={styles.button1} onClick={() => navigate("/")}>
                RETRY
              </button>
              {/* 누르면 다른 유형 보여주는 화면으로 이동? 일단 HOME으로 가도록 해둠 */}
              <button className={styles.button1} onClick={() => navigate("/")}>
                MORE
              </button>
            </div>
            <div>
              <FlexContainer>
                <h1>공유하기</h1>
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
                  <KakaoShareButton onClick={handleKakaoButton}>
                    <KakaoIcon src={kakaoLogo}></KakaoIcon>
                  </KakaoShareButton>
                </GridContainer>
              </FlexContainer>
            </div>
          </div>
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
