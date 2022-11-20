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
  const [result, setResult] = useState(0);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <InputArea>
          <Formula></Formula>
          <Result>{result}</Result>
        </InputArea>
        <ButtonArea />
      </Wrapper>
    </>
  );
};

export default App;
