import React, {useState} from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialCredentials = {
  username: "",
  password: ""
}

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState(initialCredentials);

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/login", credentials)
      .then(res => {
        console.log("Response from login", res)
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        name="username"
        value={credentials.username}
        placeholder="username..."
        onChange={handleChange}
        />
        <input
        type="password"
        name="password"
        value={credentials.password}
        placeholder="password..."  
        onChange={handleChange}       
        />
        <button>Log In</button>
      </form>

    </>
  );
};

export default Login;
