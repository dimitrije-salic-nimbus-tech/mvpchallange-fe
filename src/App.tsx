import React from 'react';
import styled from "styled-components";

import MvpMatch from "./views";

const App = () => {
  return (
    <MvpContainer >
      <MvpMatch />
    </MvpContainer>
  );
};

export default App;

const MvpContainer = styled.div`
  height: 100vh;
  width: 100vw;
`
