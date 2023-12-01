import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <div className="background">
      <div className="slogan-container">
        <div className="slogan">
          <h2>
            <span className="Divorce-color">Divorce</span> doesn't have to break families apart.</h2>
        </div>
        <div className="buttons-container">
          <div>
            <button className="btn login-btn" onClick={onLogin}>
              Login
            </button>
          </div>
          <div>
            <button className="btn reg-btn" onClick={onRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
