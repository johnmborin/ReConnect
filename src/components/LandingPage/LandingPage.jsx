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
          <h2>Divorce doesn't have to break families apart.</h2>
        </div>
        <div className="buttons-container">
          <div className="login-btn">
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </div>
          <div className="reg-btn">
            <button className="btn btn_sizeSm" onClick={onRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
