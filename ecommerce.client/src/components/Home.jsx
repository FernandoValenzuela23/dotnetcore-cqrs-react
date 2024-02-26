import React from 'react';
import SessionManager from './Auth/SessionManager';
import { Layout } from './Layout';
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  // If not loggedin
  if (!SessionManager.getToken()) {
    navigate('/');
  }

  return (
    <div className='main-container'>
      <h3 className="box">Welcome to admin panel!</h3>
      <Layout className="box" />
    </div>
  );

}
