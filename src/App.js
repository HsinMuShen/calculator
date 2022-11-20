import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import ButtonArea from "./ButtonArea";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
  }

`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const InputArea = styled.div``;

const Formula = styled.div``;
const Result = styled.div``;

const App = () => {
  const [formulaList, setFormulaList] = useState([]);
  const [result, setResult] = useState(0);

  const judgeInputType = (input) => {
    switch (input) {
      case ".":
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return "number";
      case "+":
      case "-":
      case "×":
      case "%":
        return "symbol";
    }
  };

  const addWord = (item) => {
    const type = judgeInputType(item);
    console.log(type);
    if (formulaList.length === 0) {
      if (type === "symbol") {
        alert("請先輸入數字");
        return;
      } else if (type === "number") {
        setFormulaList([item]);
      }
    } else {
      let tempArr = [...formulaList];
      if (judgeInputType(tempArr[tempArr.length - 1]) === "symbol") {
        if (type === "number" && item !== ".") {
          setFormulaList([...formulaList, item]);
        } else if (type === "symbol") {
          tempArr.pop();
          tempArr.push(item);
          setFormulaList(tempArr);
        } else if (item === ".") {
          alert(`數字開頭不得為 "."`);
          return;
        }
      } else {
        if (type === "number") {
          if (item === "." && tempArr[tempArr.length - 1].includes(".")) {
            alert(`單一數字只能有一個 "."`);
            return;
          }
          if (tempArr[tempArr.length - 1] === "0") {
            if (item === "0") {
              alert(`數字開頭不得為重複 "0"`);
              return;
            } else {
              tempArr.pop();
              tempArr.push(item);
              setFormulaList(tempArr);
              return;
            }
          }

          tempArr[tempArr.length - 1] = tempArr[tempArr.length - 1] + item;
          setFormulaList(tempArr);
        } else if (type === "symbol") {
          tempArr.push(item);
          setFormulaList(tempArr);
        }
      }
    }
  };

  const reset = () => {
    setFormulaList([]);
    setResult(0);
  };

  const calcResult = () => {};
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <InputArea>
          <Formula>{formulaList}</Formula>
          <Result>{result}</Result>
        </InputArea>
        <ButtonArea addWord={addWord} reset={reset} calcResult={calcResult} />
      </Wrapper>
    </>
  );
};

export default App;
