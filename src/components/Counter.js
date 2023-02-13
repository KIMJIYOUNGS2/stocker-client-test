import React, { useState, useEffect } from "react";
import styles from "./Counter.module.css";

function Counter({ count }) {
  const [userCount, setUserCount] = useState(0);
  const counter = (max) => {
    // console.log(count);
    let now = max;

    const handle = setInterval(() => {
      setUserCount(Math.ceil(max - now));

      // 목표수치에 도달하면 정지
      if (now < 1) {
        clearInterval(handle);
      }
      let step = now / 27;

      if (now > max / 1.02) {
        step = max / 1.02;
      }

      // 증가되는 값이 계속하여 작아짐

      // 값을 적용시키면서 다음 차례에 영향을 끼침
      now -= step;
    }, 50);
  };
  useEffect(() => {
    setTimeout(() => counter(count + 1000), 500);
  }, []);
  return <p className={styles.p}>누적참여자수 : {userCount}</p>;
}

export default Counter;
