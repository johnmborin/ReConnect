import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        city: city,
        state: state,
        username: username,
        password: password,
        accessLevel: accessLevel,
      },
    });
  };

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" accessLevel="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="dateOfBirth">
          Date of Birth:
          <input
            type="text"
            name="dateOfBirth"
            value={dateOfBirth}
            required
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="city">
          City:
          <input
            type="text"
            name="city"
            value={city}
            required
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="state">
          State:
          <input
            type="text"
            name="state"
            value={state}
            required
            onChange={(event) => setState(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="username">
          E-Mail:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="accessLevel">
          Family Role:
          <select
            name="accessLevel"
            value={accessLevel}
            required
            onChange={(event) => setAccessLevel(event.target.value)}
          >
            <option value="">Select Role</option>
            <option value="parent">Parent</option>
            <option value="child">Child</option>
          </select>
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
