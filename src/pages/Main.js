import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceMehBlank,
  faFaceRollingEyes,
  faFaceSurprise,
} from "@fortawesome/free-regular-svg-icons";
import { faUserTie, faShare } from "@fortawesome/free-solid-svg-icons";
import useMbti from "../hooks/useMbti";
import calculate from "../helper/calculate";
import ProgressBar from "../components/ProgressBar";
import MetaTag from "../helper/MetaTag";

function Main() {
  const navigate = useNavigate();
  const [totalSurvey, setTotalSurvey] = useState(0);
  const [surveyId, setSurveyId] = useState(1);
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [init, setInit] = useState(0);
  const [result, setResult] = useState("");
  const [totalResult, setTotalResult] = useState("");
  const [style1, setStyle1] = useState(styles.label);
  const [style2, setStyle2] = useState(styles.label);
  const [isHovering, setIsHovering] = useState(0);
  const [modal, setModal] = useState(0);
  const { setMbti, setRaw } = useMbti();

  useEffect(() => {
    setIsHovering(0);

    axios
      .get("api/v1/servey")
      .then((res) => {
        // console.log(res.data.length);
        setTotalSurvey(res.data.length);
      })
      .then(() => {
        axios
          .get(`api/v1/servey/${surveyId}`)
          .then((res) => {
            // console.log(res);
            setQuestion(res.data.title);
            setAnswer1(res.data.first_answer);
            setAnswer2(res.data.second_answer);
            setInit(1);
          })
          .catch((err) => err);
      })
      .catch((err) => err);
  }, []);

  useEffect(() => {
    if (result == "1") {
      setStyle1(styles.choice);
      setStyle2(styles.label);
    } else if (result == "2") {
      setStyle2(styles.choice);
      setStyle1(styles.label);
    } else if (result == "") {
      setStyle1(styles.label);
      setStyle2(styles.label);
    }
  }, [result]);

  useEffect(() => {
    setResult("");

    if (surveyId <= totalSurvey) {
      axios
        .get(`api/v1/servey/${surveyId}`)
        .then((res) => {
          // console.log(res);
          setQuestion(res.data.title);
          setAnswer1(res.data.first_answer);
          setAnswer2(res.data.second_answer);
          setIsHovering(0);
        })
        .catch((err) => err);
    }
  }, [surveyId]);

  const next = () => {
    if (!result == "") {
      setTotalResult(totalResult + result);
      setSurveyId(surveyId + 1);
      setIsHovering(0);
    } else if (result == "") {
      setModal(1);
      setTimeout(function () {
        setModal(0);
      }, 1000);
    }
  };

  const submit = (e) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   console.log(totalResult);
  // }, [totalResult]);

  const showResult = () => {
    if (result == "") {
      setModal(1);
      setTimeout(function () {
        setModal(0);
      }, 1000);
    } else if (!result == "") {
      setTotalResult(totalResult + result);
      setMbti(calculate(totalResult + result));
      setRaw(totalResult + result);
      sessionStorage.setItem("raw", totalResult + result);
      navigate("/result");
    }
  };

  return (
    <>
      <MetaTag />
      <form className={styles.form} onSubmit={submit}>
        {init ? (
          <>
            <h2 className={styles.h2}>{question}</h2>
            <div className={styles.wrap}>
              <input
                onClick={() => {
                  setResult("1");
                }}
                className={styles.input}
                type="radio"
                id="answer1"
                name="answer"
              />
              <label className={style1} htmlFor="answer1">
                {answer1}
              </label>
              <br />
              <input
                onClick={() => {
                  setResult("2");
                }}
                className={styles.input}
                type="radio"
                id="answer2"
                name="answer"
              />
              <label className={style2} htmlFor="answer2">
                {answer2}
              </label>
            </div>
            {surveyId == totalSurvey ? (
              <button
                className={styles.button}
                onClick={showResult}
                onMouseOver={() => setIsHovering(1)}
                onMouseOut={() => setIsHovering(0)}
              >
                {isHovering ? (
                  <FontAwesomeIcon icon={faUserTie} />
                ) : (
                  <FontAwesomeIcon icon={faFaceSurprise} />
                )}
              </button>
            ) : (
              <button
                className={styles.button}
                onClick={next}
                onMouseOver={() => setIsHovering(1)}
                onMouseOut={() => setIsHovering(0)}
              >
                {isHovering ? (
                  <FontAwesomeIcon icon={faFaceRollingEyes} />
                ) : (
                  <FontAwesomeIcon icon={faFaceMehBlank} />
                )}
              </button>
            )}
            {!result == "" ? (
              <div className={styles.clickMe}>
                <div className={styles.arrow}>
                  <FontAwesomeIcon icon={faShare} />
                </div>
                <div>click me</div>
              </div>
            ) : (
              ""
            )}
            <ProgressBar surveyId={surveyId} />
          </>
        ) : (
          <div className={styles.loading}>Now loading ...</div>
        )}
      </form>
      <div className={styles.bg}></div>
      {modal ? (
        <div className={styles.modal}>당신은 선택해야만 합니다</div>
      ) : (
        ""
      )}
    </>
  );
}

export default Main;
