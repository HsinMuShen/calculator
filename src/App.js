import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Draggable from "react-draggable";

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
  width: 402px;
  border: 1px solid;
  border-radius: 10px;
`;

const DragArea = styled.div`
  height: 40px;
  cursor: move;
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
      case "÷":
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
            } else if (item !== ".") {
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

  const calcResult = () => {
    if (
      formulaList.length === 0 ||
      judgeInputType(formulaList[formulaList.length - 1]) === "symbol"
    ) {
      alert("請輸入完整算式");
      return;
    }
    let i = 0;
    let tempArr = [...formulaList];
    while (i < tempArr.length) {
      switch (tempArr[i]) {
        case "×":
          tempArr[i - 1] = (
            Number(tempArr[i - 1]) * Number(tempArr[i + 1])
          ).toString();
          tempArr.splice(i, 2);
          break;
        case "÷":
          tempArr[i - 1] = (
            Number(tempArr[i - 1]) / Number(tempArr[i + 1])
          ).toString();
          tempArr.splice(i, 2);
          break;
        default:
          i++;
          break;
      }
    }
    i = 0;
    while (i < tempArr.length) {
      switch (tempArr[i]) {
        case "+":
          tempArr[i - 1] = (
            Number(tempArr[i - 1]) + Number(tempArr[i + 1])
          ).toString();
          tempArr.splice(i, 2);
          break;
        case "-":
          tempArr[i - 1] = (
            Number(tempArr[i - 1]) - Number(tempArr[i + 1])
          ).toString();
          tempArr.splice(i, 2);
          break;
        default:
          i++;
          break;
      }
    }
    setResult(parseFloat(Number(tempArr[0]).toPrecision(12)) / 1);
  };
  return (
    <>
      <GlobalStyle />
      <Draggable handle=".drag-handler">
        <Wrapper>
          <DragArea className="drag-handler">點擊拖曳</DragArea>

          <InputArea>
            <Formula>{formulaList}</Formula>
            <Result>{result}</Result>
          </InputArea>
          <ButtonArea addWord={addWord} reset={reset} calcResult={calcResult} />
        </Wrapper>
      </Draggable>
    </>
  );
};

export default App;
