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
import KakaoShareBtn from "../components/KakaoShareBtn";
import Modal from "../components/Modal";
import ReactLoading from "react-loading";

function Result() {
  const navigate = useNavigate();
  const [kind, setKind] = useState();
  const [content, setContent] = useState();
  const [surmmary, setSurmmary] = useState();
  const [similar, setSimilar] = useState();
  const [worst, setWorst] = useState();
  const { mbti, setMbti, raw } = useMbti();
  const [init, setInit] = useState(0);
  const [ModalisOpen, setModalIsOpen] = useState(false);

  // info modal
  const onClickButton = () => {
    setModalIsOpen(true);
  };

  // 첫 화면이 공유 링크가 되도록 설정 (나중에는 배포한 도메인으로 수정예정)
  const shareUrl = window.location.href.replace("result", "");
  // console.log(shareUrl);

  // kakao SDK import하기
  // const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");

  // kakao sdk 초기화하기
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도
  // useEffect(() => {
  //   if (status === "ready" && window.Kakao) {
  //     // 중복 initialization 방지
  //     if (!window.Kakao.isInitialized()) {
  //       // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
  //       // init에 카카오 javascript key 입력
  //       window.Kakao.init("45cd70138fba6be56ebfff3df807aa7c");
  //     }
  //   }
  // }, [status]);

  // const shareKakao = () => {
  //   window.Kakao.Link.sendCustom({
  //     templateId: 89914, // 템플릿 아이디 입력
  //   });
  // };

  // api POST - axios.defaults.baseURL = "https://kimduhong.pythonanywhere.com/"
  useEffect(() => {
    setTimeout(function () {
      setInit(1);
    }, 1500);
    // 카카오 공유를 위한 카카오 sdk 추가
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    // mbti가 없으면 sessionStorage에서 불러옴
    if (
      mbti === "" &&
      sessionStorage.getItem("mbti") &&
      sessionStorage.getItem("raw")
    ) {
      // setMbti(sessionStorage.getItem("mbti"));
      // setRaw(sessionStorage.getItem("raw"));
      // console.log(sessionStorage.getItem("mbti"));
      axios
        .post(`api/v1/result/@${sessionStorage.getItem("mbti")}`, {
          answer: sessionStorage.getItem("raw"),
        })
        .then((res) => {
          setMbti(res.data.mbti); // mbti: mbti 유형
          setKind(res.data.kind.kind); // kind:개발자 유형
          setSurmmary(res.data.kind.surmmary); // summary:한줄 요약
          setContent(res.data.kind.content); // content:유형에 대한 설명
          setSimilar(res.data.kind.similar); // similar: 가장 잘 맞는 유형
          setWorst(res.data.kind.worst); // worst: 가장 잘 맞지 않는 유형
          // setInit(1);
        })
        .catch((err) => err);
      //mbti값이 있으면 바로 axios 진행
    } else if (mbti !== "" && raw !== "") {
      axios
        .post(`api/v1/result/@${mbti}`, { answer: raw })
        .then((res) => {
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
    //cleanup: 카카오 sdk 제거
    return () => document.body.removeChild(script);
  }, [mbti, navigate, raw, setMbti]);

  return (
    <div className={styles.div}>
      <div className={styles.bg}></div>
      {init ? (
        <>
          <div className={styles.surmmary}>{surmmary}</div>

          <div className={styles.header}>
            당신은 <span className={styles.text_under}>&nbsp;{kind}&nbsp;</span>{" "}
            유형입니다.
          </div>

          <div className={styles.content_container}>
            <div className={styles.content}>{content}</div>
            {/* <Type> */}
            <div className={styles.kind}>
              <div className={styles.othercontent}>
                당신과 잘 맞는 유형은 <br />
                <span className={styles.text_under2}>{similar}</span>입니다.
              </div>
              <div className={styles.othercontent}>
                당신과 잘 맞지 않는 유형은 <br />
                <span className={styles.text_under2}>{worst}</span>입니다.
              </div>
            </div>
          </div>

          <div className={styles.button_group}>
            <div className={styles.group1}>
              <button className={styles.button2} onClick={() => navigate("/")}>
                Retry
              </button>
              <div className={styles.modalwrap}>
                <button className={styles.button1} onClick={onClickButton}>
                  Info
                </button>
                {ModalisOpen && (
                  <Modal
                    open={ModalisOpen}
                    onClose={() => {
                      setModalIsOpen(false);
                    }}
                  />
                )}
              </div>
            </div>
            <div>
              <div className={styles.flex_container}>
                <div className={styles.grid_container}>
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
                  <KakaoShareBtn />
                </div>
              </div>
            </div>
            <p className={styles.info}>
              스토커J의 정체는 Info에서 확인하실 수 있습니다
            </p>
          </div>
        </>
      ) : (
        <div className={styles.loading}>
          <ReactLoading
            type={"spokes"}
            color={"white"}
            height={"10vw"}
            width={"10vw"}
          />
        </div>
      )}
    </div>
  );
}

export default Result;
