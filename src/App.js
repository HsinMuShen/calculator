import React, { useState, useEffect } from "react";
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
  background-color: #404258;
  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 50vh;
    overflow: auto;
  }
`;

const DragArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eeeeee;
  height: 40px;
  cursor: move;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Formula = styled.input`
  height: 30px;
  font-size: 20px;
  border: 0px;
  padding: 0 20px;
  text-align: right;
  background-color: #50577a;
  color: #eeeeee;
`;
const Result = styled.input`
  height: 44px;
  font-size: 32px;
  border: 0px;
  padding: 0 20px;
  text-align: right;
  background-color: #50577a;
  color: #eeeeee;
`;

const App = () => {
  const [formulaList, setFormulaList] = useState([]);
  const [formulaDisplay, setFormulaDisplay] = useState("");
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
      case "+/-":
        return "plusMinus";
    }
  };

  const addWord = (item) => {
    const type = judgeInputType(item);

    if (formulaList.length === 0) {
      if (type === "symbol") {
        alert("請先輸入數字");
        return;
      } else if (type === "number" && item !== ".") {
        setFormulaList([item]);
      } else if (type === "plusMinus") {
        setFormulaList(["-"]);
      }
    } else {
      let tempArr = [...formulaList];
      if (type === "plusMinus") {
        if (
          tempArr[tempArr.length - 1] === "-" &&
          (judgeInputType(tempArr[tempArr.length - 2]) === "symbol" ||
            tempArr.length === 1)
        ) {
          tempArr.pop();
        } else if (judgeInputType(tempArr[tempArr.length - 1]) === "symbol") {
          tempArr.push("-");
        } else if (judgeInputType(tempArr[tempArr.length - 1]) !== "symbol") {
          tempArr[tempArr.length - 1] = (
            Number(tempArr[tempArr.length - 1]) * -1
          ).toString();
        }
        setFormulaList(tempArr);
        return;
      } else if (type === "symbol") {
        if (
          tempArr[tempArr.length - 1] === "-" &&
          (judgeInputType(tempArr[tempArr.length - 2]) === "symbol" ||
            tempArr.length === 1)
        ) {
          alert("請輸入正確算式");
          return;
        } else if (judgeInputType(tempArr[tempArr.length - 1]) === "symbol") {
          tempArr.pop();
          tempArr.push(item);
          setFormulaList(tempArr);
        } else if (judgeInputType(tempArr[tempArr.length - 1]) !== "symbol") {
          if (
            tempArr[tempArr.length - 1].indexOf(".") ===
            tempArr[tempArr.length - 1].length - 1
          ) {
            alert(`數字尾數不得為 "."`);
            return;
          }
          tempArr.push(item);
          setFormulaList(tempArr);
        }
      } else if (type === "number") {
        if (item === "." && tempArr[tempArr.length - 1].includes(".")) {
          alert(`單一數字只能有一個 "."`);
          return;
        } else if (
          tempArr[tempArr.length - 1] === "-" &&
          (judgeInputType(tempArr[tempArr.length - 2]) === "symbol" ||
            tempArr.length === 1)
        ) {
          tempArr[tempArr.length - 1] += item;
          setFormulaList(tempArr);
        } else if (judgeInputType(tempArr[tempArr.length - 1]) === "symbol") {
          if (type === "number" && item !== ".") {
            setFormulaList([...formulaList, item]);
          } else if (item === ".") {
            alert(`數字開頭不得為 "."`);
            return;
          }
        } else if (tempArr[tempArr.length - 1] === "0") {
          if (item === "0") {
            alert(`數字開頭不得為重複 "0"`);
            return;
          } else if (item !== ".") {
            tempArr.pop();
            tempArr.push(item);
            setFormulaList(tempArr);
            return;
          }
        } else {
          tempArr[tempArr.length - 1] = tempArr[tempArr.length - 1] + item;
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
    if (tempArr[0] > 2 ** 32) {
      alert("超過數字上限，請重新輸入");
      reset();
      return;
    }
    let result = parseFloat(Number(tempArr[0]).toPrecision(12)) / 1;
    setResult(result);
    setFormulaList([`${result}`]);
  };

  useEffect(() => {
    let newDisplay = "";
    formulaList.forEach((item) => {
      newDisplay = newDisplay + item + " ";
    });
    setFormulaDisplay(newDisplay);
  }, [formulaList]);

  return (
    <>
      <GlobalStyle />
      <Draggable handle=".drag-handler">
        <Wrapper>
          <DragArea className="drag-handler">點擊此處進行拖曳</DragArea>
          <InputArea>
            <Formula value={formulaDisplay} readOnly />
            <Result value={result} readOnly />
          </InputArea>
          <ButtonArea addWord={addWord} reset={reset} calcResult={calcResult} />
        </Wrapper>
      </Draggable>
    </>
  );
};

export default App;
