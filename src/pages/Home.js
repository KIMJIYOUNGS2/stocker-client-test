import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const start = () => {
    navigate("/intro");
  };
  return (
    <>
      <div className={styles.div}>
        <h2>스토커J에 대하여</h2>
        <h3 className={styles.h3}>
          본격 너드스릴러 심리테스트
          <br />- 당신의 선택으로 알아보는 개발자 성향 -
        </h3>
        <button className={styles.button} onClick={start}>
          Start
        </button>
      </div>
    </>
  );
}

export default Home;
