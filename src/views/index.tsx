import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ApiRoutes } from '../utils/routes';
import Auth from './Auth';
import Dashboard from './Dashboard';
import styled from 'styled-components';

const MvpMatch = () => {
  return (
    <MvpMatchContainer>
      <Routes>
        <Route path={`${ApiRoutes.Auth.root}/*`} element={<Auth />} />
        <Route path={`${ApiRoutes.Dashboard.root}/*`} element={<Dashboard />} />
        <Route path="*" element={<Navigate to={ApiRoutes.Auth.root} />} />
      </Routes>
    </MvpMatchContainer>
  );
};

export default MvpMatch;

const MvpMatchContainer = styled.div`
  height: 100%;
`;
