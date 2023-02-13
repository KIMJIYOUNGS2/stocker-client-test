import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import styles from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.div}>
      <p>요청하신 페이지가 존재하지 않습니다</p>
      <br />
      <button className={styles.button} onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    </div>
  );
}

export default NotFound;
