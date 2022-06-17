import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import Button from '../../../../../components/Button/Button';
import { reset } from '../../../../../store/slices/promise/actions';
import { resetDeposit } from '../../../../../store/thunks/user/ResetDeposit';
import { useAuth } from '../../../../../hooks/UseAuth/UseAuth';
import { StoreState } from '../../../../../store';
import { PromiseState } from '../../../../../store/slices/promise/types';
import {PromiseResult} from "../../../../../shared/types/PromiseResult";
import {resetDepositAction} from "../../../../../store/slices/user/actions";

const ResetDeposit = () => {
  const { fulfilled, rejected } = useSelector<StoreState, PromiseState>((state) => state.promise);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [deposit, setDeposit] = useState(user!.deposit);

  useEffect(() => {
    setDeposit(user!.deposit);
  }, [user]);

  useEffect(() => {
    const fulfilledResetDeposit = fulfilled.getItem(resetDepositAction) as PromiseResult;
    if (fulfilledResetDeposit) {
      dispatch(reset(resetDepositAction));
      enqueueSnackbar(`Deposit has been successfully reset`, { variant: 'success' });
    }
  }, [fulfilled, rejected]);

  const resetDep = async () => {
    try {
      dispatch(resetDeposit(user!.id));
    } catch (err) {
      // TODO: toast
    }
    reset();
  };

  return (
    <div>
      <Title>Reset Deposit </Title>
      <ResetDepositContainer>
        <DepositWrapper>{deposit}</DepositWrapper>
        <ButtonWrapper>
          <Button onClick={() => resetDep()} label="Submit" />
        </ButtonWrapper>
      </ResetDepositContainer>
    </div>
  );
};
export default ResetDeposit;

const ButtonWrapper = styled.div`
  margin: 0 0 0 3rem;
`;

const DepositWrapper = styled.div`
  height: 2rem;
  width: 2rem;
  font-size: 2rem;
`;

const ResetDepositContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.p`
  font-size: 2.2rem;
  color: #1941af;
  text-shadow: 0.1rem 0.1rem 0.1rem black;
`;
