import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './context/userContext';

const PrivateRoute = ({ element }) => {
  const { username } = useContext(UserContext);

  return username ? element : <Navigate to="/" />;
};

export default PrivateRoute;
