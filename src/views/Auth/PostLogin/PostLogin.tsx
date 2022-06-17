import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { login } from '../../../store/thunks/auth/Login';
import { StoreState } from '../../../store';
import { PromiseState } from '../../../store/slices/promise/types';
import { loginAction } from '../../../store/slices/auth/actions';
import { PromiseResult } from '../../../shared/types/PromiseResult';
import { reset } from '../../../store/slices/promise/actions';
import {useDidMountEffect} from "../../../hooks/UseDidMount/UseDidMount";

const PostLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fulfilled } = useSelector<StoreState, PromiseState>((state) => state.promise);
  const [searchParams] = useSearchParams();

  useDidMountEffect(() => {
    const code: string | null = searchParams.get('code');
    dispatch(login(code));
  }, []);

  useEffect(() => {
    const fulfilledLogin = fulfilled.getItem(loginAction) as PromiseResult;
    if (fulfilledLogin) {
      navigate('/products/view');
      dispatch(reset(loginAction));
    }
  }, [fulfilled]);

  return <></>;
};

export default PostLogin;
