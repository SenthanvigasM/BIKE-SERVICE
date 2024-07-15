import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import log from './assets/img/login.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log("Server Response:", result.data);
        if (result.data === "Login successful") {
          console.log("Login successful");
          localStorage.setItem('loggedInUserEmail', email); 
          navigate('/service');
        } else if (result.data === "Login Admin") {
          console.log("Login as admin successful");
          navigate('/admin');
        } else {
          setError('Invalid email or password. Please try again.');
        }
      })
      .catch(err => {
        console.error('Error during login:', err);
        setError('Check your credentials.');
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-content"> 
      <img src={log} alt="img" className="log_img" />
      <div className="content">
        <div className="text">Login Form</div>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="field">
            <input placeholder='Email' type="text" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <span className="fas fa-user"></span>
          </div>
          <div className="field">
            <input placeholder='Password' type={showPassword ? "text" : "password"} name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className="fas fa-lock"></span>
          </div>
          <button type="submit">Sign in</button>
          <div className="sign-up">
            Not a member? <Link to="/register">Signup</Link>
            <br />
            Get back to <Link to="/">Home</Link>  
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
