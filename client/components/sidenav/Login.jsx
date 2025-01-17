import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  
  const [loginMessage, setLoginMessage] = useState([]);
  const [loginRedirect, setLoginRedirect] = useState(false);

  //async function that will check to see if the user exists
  const checkUser = async () => {
    //grab the form fields and build an object
    const username = document.querySelector('.login-username');
    const password = document.querySelector('.login-password');
    const user = {username: username.value, password: password.value}
    console.log(user)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({user: user}),
      };
    try {
      console.log('button is pressed')
      const serverReponse = await fetch('/auth/login/', options);
      console.log(serverReponse)
      if (serverReponse.ok) {
        navigate('/', { replace: true })
      } else {
        setLoginMessage([<p id='error'>Could not find username or password.</p>])
      }
    }
    catch (err) {
      //if the login fails, throw this error below the login button
      setLoginMessage([<p id='error'>Could not find username or password.</p>])
    }
  }


return (
  <div id='login'>
  <h1>Login</h1>
    <div id="username" >
    <label>User Name:</label>
    <input type='text' id='username' className='login-username'></input>
    </div>
    <div id="password">
    <label>Password:</label>
    <input type='password' id='password' className='login-password'></input>
    </div>
    <button onClick={checkUser}>Login</button>
    {loginMessage}
  </div>
)
}
// why is password's id like that?
export default Login;