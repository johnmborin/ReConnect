import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

// Material UI
import TextField from '@mui/material/TextField';
import ContainedButton from '@mui/material/Button';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div style={{ marginBottom: '10px' }}>
      <TextField
        InputProps={{
          style: {
            borderRadius: "40px",
            width: "250px",
            backgroundColor: 'white'
          }
        }}
          label="Username"
          variant='outlined'
          type="text"
          name="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
      <TextField
        InputProps={{
          style: {
            borderRadius: "40px",
            width: "250px",
            backgroundColor: 'white'
          }
        }}
          label="Password"
          variant='outlined'
          type="password"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <ContainedButton
          variant="contained" 
          style={{ backgroundColor: '#049BAA', borderRadius: "40px", width: '150px'}}    
          type="submit"
        >
          Log In
        </ContainedButton>
      </div>
    </form>
  );
}

export default LoginForm;


