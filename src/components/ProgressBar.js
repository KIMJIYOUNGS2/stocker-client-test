import React, { useState, useEffect } from "react";
import styles from "./ProgressBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonWalking,
  faMapPin,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

function ProgressBar({ surveyId }) {
  const [arr, setArr] = useState([]);
  const [style, setStyle] = useState("");

  useEffect(() => {
    setArr([]);
    for (let i = 1; i <= 9 - surveyId; i++) {
      setArr((arr) => [...arr, i]);
    }
  }, [surveyId]);

  useEffect(() => {
    switch (surveyId) {
      //   case 1:
      //     return setStyle(styles.progress1);
      case 2:
        return setStyle(styles.progress2);
      case 3:
        return setStyle(styles.progress3);
      case 4:
        return setStyle(styles.progress4);
      case 5:
        return setStyle(styles.progress5);
      case 6:
        return setStyle(styles.progress6);
      case 7:
        return setStyle(styles.progress7);
      case 8:
        return setStyle(styles.progress8);
      case 9:
        return setStyle(styles.progress9);
    }
  }, [surveyId]);

  return (
    <div className={`${styles.progress} ${style}`}>
      <div>
        <FontAwesomeIcon icon={faPersonWalking} />
      </div>
      {arr.map((el) => {
        return (
          <div className={styles.pin} key={el}>
            <FontAwesomeIcon icon={faMapPin} />
          </div>
        );
      })}
      <div>
        <FontAwesomeIcon icon={faQuestion} />
      </div>
    </div>
  );
}

export default ProgressBar;
