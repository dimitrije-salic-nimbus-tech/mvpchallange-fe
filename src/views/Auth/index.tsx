import { Route } from 'react-router-dom';
import React from 'react';
import { Navigate, Routes } from 'react-router';

import Login from './Login/Login';
import { ApiRoutes } from '../../utils/routes';
import PostLogin from './PostLogin/PostLogin';

const Auth = () => {
  return (
    <Routes>
      <Route path={`${ApiRoutes.Auth.login}`} element={<Login />} />
      <Route path={`${ApiRoutes.Auth.postLogin}`} element={<PostLogin />} />
      <Route path="*" element={<Navigate to={`${ApiRoutes.Auth.root}${ApiRoutes.Auth.login}`} />} />
    </Routes>
  );
};

export default Auth;
