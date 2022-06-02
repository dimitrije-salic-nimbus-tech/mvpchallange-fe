import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createProductRequest } from '../../../../service/api/Product/ProductService';
import { CreateProductRequest } from '../../../../shared/types/request/CreateProductRequest';

const AddProduct = () => {
  const dispatch = useDispatch();
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

  const onSubmit = async (payload: any) => {
    const { name, price, amountAvailable } = payload;
    const request: CreateProductRequest = {
      name,
      price: +price,
      amountAvailable: +amountAvailable,
    };
    try {
      await dispatch(createProductRequest('1243e9cc-6673-4b97-8c0f-02ca8f6053ca', request));
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  const getFormErrorMessage = (name: any) => {
    // @ts-ignore
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  return (
    <div>
      <div>Add Product</div>
      <FormContent onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            // @ts-ignore
            <InputText type="text" id={field.name} {...field} autoFocus />
          )}
        />
        {getFormErrorMessage('name')}

        <InputLabel htmlFor="price">Price</InputLabel>
        <Controller
          name="price"
          control={control}
          rules={{ required: 'Price is required' }}
          render={({ field }) => (
            // @ts-ignore
            <InputText type="text" id={field.name} {...field} autoFocus />
          )}
        />
        {getFormErrorMessage('price')}

        <InputLabel htmlFor="amountAvailable">Amount Available</InputLabel>
        <Controller
          name="amountAvailable"
          control={control}
          rules={{ required: 'Amount Available is required' }}
          render={({ field }) => (
            // @ts-ignore
            <InputText type="text" id={field.name} {...field} autoFocus />
          )}
        />

        {getFormErrorMessage('amountAvailable')}
        {/* @ts-ignore */}
        <Button type="submit" label="Submit" />
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
`;
