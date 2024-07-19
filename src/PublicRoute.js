import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './context/userContext';

const PublicRoute = ({ element }) => {
  const { username } = useContext(UserContext);

  return username ? <Navigate to="/dashboard" /> : element;
};

export default PublicRoute;
