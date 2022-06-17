import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from '../../../components/Button/Button';
import { getCognitoLoginUrl } from '../../../store/thunks/auth/GetCognitoLoginUrl';
import { StoreState } from '../../../store';
import { PromiseState } from '../../../store/slices/promise/types';
import { getCognitoUrlAction } from '../../../store/slices/cognito/actions';
import { PromiseResult } from '../../../shared/types/PromiseResult';
import { reset } from '../../../store/slices/promise/actions';

const Login = () => {
  const dispatch = useDispatch();
  const { fulfilled } = useSelector<StoreState, PromiseState>((state) => state.promise);

  const loginHandler = async () => {
    dispatch(getCognitoLoginUrl());
  };

  useEffect(() => {
    const fulfilledGetCognitoUrl = fulfilled.getItem(getCognitoUrlAction) as PromiseResult;
    if (fulfilledGetCognitoUrl) {
      window.open(fulfilledGetCognitoUrl.data.cognitoLoginUri, '_self');
      dispatch(reset(getCognitoUrlAction));
    }
  }, [fulfilled]);

  return (
    <AuthContainer>
      <Button label="Login" onClick={() => loginHandler()} />
    </AuthContainer>
  );
};

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Login;
