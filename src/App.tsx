import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import MvpMatch from './views';
import { setupAxios } from './service/HttpService';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setupAxios(dispatch);
  }, []);

  return (
    <MvpContainer>
      <MvpMatch />
    </MvpContainer>
  );
};

export default App;

const MvpContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;
