import React from "react";
import styled from "styled-components";

function Modal({ onClose }) {
  const handleClose = (e) => {
    console.log(e.target);
    onClose?.();
  };
  return (
    <Overlay onClick={handleClose}>
      <ModalWrap>
        <Contents>
          <Content>
            본 심리테스트는 오즈코딩스쿨
            <BoldText>
              린스타트업 맞춤형 Serverless MVP 개발 전문가 양성 과정 1기 3팀이
              3일만에 구현한 결과물
            </BoldText>
            입니다.
          </Content>
          <LinkButton
            onClick={() => window.open("https://ozcodingschool.com/")}
          >
            오즈코딩스쿨 알아보기 >
          </LinkButton>
          <LinkButton
            onClick={() =>
              window.open(
                "https://fluorescent-keyboard-35b.notion.site/Staff-f14b56045d624e1ba9974184be8019c3"
              )
            }
          >
            팀 소개 페이지 >
          </LinkButton>
          <CloseButton onClick={handleClose}>x</CloseButton>
        </Contents>
      </ModalWrap>
    </Overlay>
  );
}

// ssasd
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 400px;
  height: fit-content;
  border-radius: 15px;
  border: 5px solid blue;
  background-color: transparent;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (orientation: portrait) {
    width: 70%;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15% 3%;
  white-space: pre-line;
  align-items: center;
  word-spacing: 1px;
`;

const Content = styled.div`
  width: 330px;
  font-family: initial;
  font-size: 1.2rem;
  @media (orientation: portrait) {
    font-size: 3vw;
    width: 90%;
  }
`;
const BoldText = styled.p`
  margin: 5%;
  font-weight: bold;
`;
const LinkButton = styled.button`
  margin: 8%;
  width: 280px;
  height: 50px;
  margin-bottom: 0;
  border-radius: 10px;
  background-color: blue;
  color: white;
  font-size: 1.3rem;
  font-family: initial;
  &:hover {
    background-color: black;
    color: white;
  }
  @media (orientation: portrait) {
    width: 70%;
    height: 4vh;
    font-size: 2vw;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 18px;
  background-color: transparent;
  color: gray;
  font-size: 30px;
  margin: 5% 4%;
  width: 10px;
  // border-radius: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;
export default Modal;
