import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupMessage, setsignupMessage] = useState([]);
  //async function that will check to see if the user exists
  const createUser = async () => {
    //grab the form fields and build an object
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const user = {username: username.value, password: password.value}
    console.log('before the post request: ', username.value)
    //checks to make sure form fields are not empty
    for (const key in user) {
      if (user[key] === '') {
        setsignupMessage([<p>Please input a valid username or password.</p>])
        return;
      }
    }
      //construct the object I am going to POST to the server 
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({user: user}),
      };
    try {
      const serverReponse = await fetch('http://localhost:3000/create-new-user/', options);
      if (serverReponse.ok) return navigate('/', { replace: true })
      else setsignupMessage([<p id='error'>Unable to create account. Please try again.</p>])
    }
    catch (err) {
      //if the login fails, throw this error below the login button
      setsignupMessage([<p id='error'>Unable to create account. Please try again.</p>])
    }
  }

return (
  <div id='login'>
  <h1>SignUp</h1>
    <div id="username-field">
      <label>User Name:</label>
      <input type='text' id='username'></input>
    </div>
    <div id="password-field">
      <label>Password:</label>
      <input type='password' id='password'></input>
    </div>
    <button onClick={createUser}>Create Account</button>
    {signupMessage} 
  </div>
)
}

export default Signup;