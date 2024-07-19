import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import './index.css'; // Ensure Tailwind CSS is included
import { UserProvider } from './context/userContext';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PublicRoute element={<LoginForm />} />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          </Routes>
        </Router>
      </UserProvider>
    </Provider>
  );
};

export default App;
