import React from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalculateButtonArea = styled.div`
  display: flex;
`;

const NumberButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  @media screen and (max-width: 768px) {
    width: 75vw;
  }
`;

const NumberButton = styled.button`
  width: 80px;
  height: 80px;
  background-color: #474e68;
  color: #eeeeee;
  border: 0px;
  border-radius: 20%;
  cursor: pointer;
  font-size: 20px;
  margin: 10px;
  @media screen and (max-width: 768px) {
    width: 20vw;
    margin: 1vw;
  }
`;

const SymbolsButtonArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100px;
  @media screen and (max-width: 768px) {
    width: 25vw;
  }
`;

const ResultButtonArea = styled.div`
  display: flex;
`;

const ResultButton = styled.button`
  width: 180px;
  height: 80px;
  background-color: #6b728e;
  color: #eeeeee;
  border: 0px;
  border-radius: 10%;
  cursor: pointer;
  font-size: 20px;
  margin: 10px;
  @media screen and (max-width: 768px) {
    width: 40vw;
    margin: 5vw;
  }
`;

const ButtonArea = ({ addWord, reset, calcResult }) => {
  const numbersButtons = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "0",
    ".",
    "+/-",
  ];
  const symbolButtons = ["÷", "×", "-", "+"];
  const resultButtons = ["AC", "="];
  return (
    <Wrapper>
      <CalculateButtonArea>
        <NumberButtonArea>
          {numbersButtons.map((num) => {
            return (
              <NumberButton
                key={num}
                onClick={() => {
                  addWord(num);
                }}
              >
                {num}
              </NumberButton>
            );
          })}
        </NumberButtonArea>
        <SymbolsButtonArea>
          {symbolButtons.map((num) => {
            return (
              <NumberButton
                key={num}
                onClick={() => {
                  addWord(num);
                }}
              >
                {num}
              </NumberButton>
            );
          })}
        </SymbolsButtonArea>
      </CalculateButtonArea>
      <ResultButtonArea>
        {resultButtons.map((num) => {
          return (
            <ResultButton
              key={num}
              onClick={() => {
                if (num === "AC") reset();
                else if (num === "=") calcResult();
              }}
            >
              {num}
            </ResultButton>
          );
        })}
      </ResultButtonArea>
    </Wrapper>
  );
};

export default ButtonArea;
