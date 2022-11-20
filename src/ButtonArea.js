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
`;

const NumberButton = styled.button`
  width: 100px;
  height: 100px;
  background-color: #ffffff;
  border: 1px solid #555555;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
`;

const SymbolsButtonArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100px;
`;

const ResultButtonArea = styled.div``;

const ButtonArea = () => {
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
    "00",
    ".",
  ];
  const symbolButtons = ["/", "*", "-", "+"];
  const resultButtons = ["AC", "="];
  return (
    <Wrapper>
      <CalculateButtonArea>
        <NumberButtonArea>
          {numbersButtons.map((num) => {
            return <NumberButton>{num}</NumberButton>;
          })}
        </NumberButtonArea>
        <SymbolsButtonArea>
          {symbolButtons.map((num) => {
            return <NumberButton>{num}</NumberButton>;
          })}
        </SymbolsButtonArea>
      </CalculateButtonArea>
      <ResultButtonArea>
        {resultButtons.map((num) => {
          return <NumberButton>{num}</NumberButton>;
        })}
      </ResultButtonArea>
    </Wrapper>
  );
};

export default ButtonArea;
