import React, { useState } from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  };

  const login = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then(response => {
        localStorage.setItem("token", response.data.payload);
        props.history.push("/protected");
      })
      .catch(error => {
        console.log("Error ->", error);
      });
  };

  return (
    <>
      <form onSubmit={login}>
        <label for="username">Username: <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        /></label><br />
        <label for="password">Password: <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        /></label><br />
        <button>Log In</button> 
      </form>
    </>
  );
};

export default Login;
