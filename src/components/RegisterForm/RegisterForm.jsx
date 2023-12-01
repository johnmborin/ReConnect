import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI 
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        city: city,
        state: state,
        email: email,
        username: username,
        password: password,
        role: role,
      },
    });
    }; 

  return (
    <form className="formPanel" onSubmit={registerUser} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <TextField
        InputProps={{
          style: {
            borderRadius: "40px",
            width: "250px",
          }
        }}
          label="First Name"
          variant="outlined"
          type="text"
          name="firstName"
          value={firstName}
          required
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div>
        <TextField
        InputProps={{
          style: {
            borderRadius: "40px",
            width: "250px",
          }
        }}
          label="Last Name"
          variant="outlined"
          type="text"
          name="lastName"
          value={lastName}
          required
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div>
        <TextField
        InputProps={{
          style: {
            borderRadius: "40px",
            width: "250px",
          }
        }}
          label="Date of Birth"
          variant="outlined"
          type="text"
          name="dateOfBirth"
          value={dateOfBirth}
          required
          onChange={(event) => setDateOfBirth(event.target.value)}
        />
      </div>
      <div>
        <TextField
        InputProps={{
          style: {
            borderRadius: "40px",
            width: "250px",
          }
        }}
          label="City"
          variant="outlined"
          type="text"
          name="city"
          value={city}
          required
          onChange={(event) => setCity(event.target.value)}
        />
      </div>
      <div>
        <TextField
        InputProps={{
          style: {
            borderRadius: "40px",
            width: "250px",
          }
        }}
          label="State"
          variant="outlined"
          type="text"
          name="state"
          value={state}
          required
          onChange={(event) => setState(event.target.value)}
        />
      </div>
      <div>
        <TextField
        InputProps={{
          style: {
            borderRadius: "40px",
            width: "250px",
          }
        }}
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <TextField
        InputProps={{
          style: {
            borderRadius: "40px",
            width: "250px",
          }
        }}
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <TextField
        InputProps={{
          style: {
            borderRadius: "40px",
            width: "250px",
          }
        }}
          label="Password"
          variant="outlined"
          type="text"
          name="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="role">
          <Select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            style={{ borderRadius: '40px', width: '250px' }}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            <MenuItem value="parent">Parent</MenuItem>
            <MenuItem value="child">Child</MenuItem>
          </Select>
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
