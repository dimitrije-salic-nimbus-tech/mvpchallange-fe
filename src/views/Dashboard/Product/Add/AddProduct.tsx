import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';

import { useDispatch, useSelector } from 'react-redux';
import { CreateProductRequest } from '../../../../shared/types/request/CreateProductRequest';
import Button from '../../../../components/Button/Button';
import { createProduct } from '../../../../store/thunks/product/CreateProduct';
import { useAuth } from '../../../../hooks/UseAuth/UseAuth';
import { StoreState } from '../../../../store';
import { PromiseState } from '../../../../store/slices/promise/types';
import { PromiseResult } from '../../../../shared/types/PromiseResult';
import { reset as res } from '../../../../store/slices/promise/actions';
import { createProductAction } from '../../../../store/slices/product/actions';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { fulfilled, rejected } = useSelector<StoreState, PromiseState>((state) => state.promise);
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    name: '',
    price: '',
    amountAvailable: '',
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    const fulfilledAddProduct = fulfilled.getItem(createProductAction) as PromiseResult;
    const rejectedAddProduct = rejected.getItem(createProductAction) as PromiseResult;
    if (fulfilledAddProduct) {
      dispatch(res(createProductAction));
      enqueueSnackbar(`Successfully added product`, { variant: 'success' });
    }
    if (rejectedAddProduct) {
      dispatch(res(createProductAction))
      enqueueSnackbar(`Product with the same name already exists`, { variant: 'error' });
    }
  }, [fulfilled, rejected]);

  const onSubmit = async (payload: any) => {
    const { name, price, amountAvailable } = payload;
    const request: CreateProductRequest = {
      name,
      price: +price,
      amountAvailable: +amountAvailable,
    };
    try {
      dispatch(createProduct(user!.id, request));
    } catch (err) {
      // TODO: toast
    }
    reset();
  };
  const getFormErrorMessage = (name: any) => {
    // @ts-ignore
    return errors[name] && <ErrorText className="p-error">{errors[name].message}</ErrorText>;
  };
  return (
    <div>
      <Title>Add Product</Title>
      <FormContent onSubmit={handleSubmit(onSubmit)}>
        <FormBox>
          <Form>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <InputWrapper>
                  {/* @ts-ignore */}
                  <InputText type="text" id={field.name} {...field} autoFocus />
                </InputWrapper>
              )}
            />
            {getFormErrorMessage('name')}
            <InputLabel htmlFor="price">Price</InputLabel>
            <Controller
              name="price"
              control={control}
              rules={{ required: 'Price is required' }}
              render={({ field }) => (
                <InputWrapper>
                  {/* @ts-ignore */}
                  <InputText type="text" id={field.name} {...field} autoFocus />
                </InputWrapper>
              )}
            />
            {getFormErrorMessage('price')}
            <InputLabel htmlFor="amountAvailable">Amount Available</InputLabel>
            <Controller
              name="amountAvailable"
              control={control}
              rules={{ required: 'Amount Available is required' }}
              render={({ field }) => (
                <InputWrapper>
                  {/* @ts-ignore */}
                  <InputText type="text" id={field.name} {...field} autoFocus />
                </InputWrapper>
              )}
            />
            {getFormErrorMessage('amountAvailable')}
          </Form>
          <ButtonWrapper>
            <Button label="Submit" />
          </ButtonWrapper>
        </FormBox>
      </FormContent>
    </div>
  );
};
export default AddProduct;
const FormContent = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;
const InputLabel = styled.label`
  margin: 1rem 0 0.3rem 0;
  color: #1941af;
  font-weight: bold;
`;
const FormBox = styled.div`
  display: flex;
  align-items: start;
  @media only screen and (max-width: 530px) {
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;
const ButtonWrapper = styled.div`
  margin: 2rem 0 0 2rem;
`;
const ErrorText = styled.div`
  color: red;
`;
const InputWrapper = styled.div`
  margin-bottom: 2rem;
  input {
    border: none !important;
    border-bottom: 2px solid #92a8d1 !important;
    padding: 0.3rem 0.3rem 0.3rem 0.2rem;
    font-size: 1.3rem;
    color: #034f84;
    border-radius: 0.4rem;
    &:active {
      border-bottom: 2px solid #034f84;
      outline: none;
      transition: all 0.3s;
    }
    &:focus {
      border-bottom: 2px solid #034f84;
      outline: none;
      transition: all 0.3s;
    }
  }
`;

const Title = styled.p`
  font-size: 2.2rem;
  color: #1941af;
  text-shadow: 0.1rem 0.1rem 0.1rem black;
`;
