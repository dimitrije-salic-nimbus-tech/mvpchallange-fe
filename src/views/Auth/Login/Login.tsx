import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from "../../../components/Button/Button";

const Login = () => {
    const navigate = useNavigate();

    // const loginHandler = async () => {
    //     const { data }  = await getCognitnoUrl();
    //     const { cognitoLoginUri}  = data;
    //     if(cognitoLoginUri){
    //         window.open(cognitoLoginUri, '_self')
    //     }
    // }

    const loginHandler = () => {
        console.log(123)
        navigate('/products');
    };

    return (
        <AuthContainer>
            <Button label='Login' onClick={() => loginHandler()}/>
        </AuthContainer>
    );
};

const AuthButton = styled(Button)`
  height: 3rem;
  width: 5rem;
  border: 1px solid black;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export default Login;
