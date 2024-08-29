import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';
import CarouselComponent from '../signupCarousel';
import PrivateHeader from "../PrivateHeader";
import './index.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import Firebase Auth functions
import app from '../firebasesetup/app'; // Import Firebase setup

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const auth = getAuth(app);
  const history = useHistory();

  const onSubmitSuccess = (jwtToken) => {
    console.log('Login successful. JWT Token:', jwtToken);
    Cookies.set('jwt_token', jwtToken, { expires: 30 }); // Store JWT in cookies
    history.replace('/');
  };

  const onSubmitFailure = (errorMsg) => {
    console.log('Login failed. Error message:', errorMsg);
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    console.log('Form submitted with email:', email, 'and password:', password);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken(); // Retrieve JWT token
      onSubmitSuccess(token);
    } catch (error) {
      onSubmitFailure(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken(); // Retrieve JWT token
      onSubmitSuccess(token);
    } catch (error) {
      handleGoogleError(error);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google login error:', error);
    setShowSubmitError(true);
    setErrorMsg('Google login failed.');
  };

  return (
    <>
      <PrivateHeader />
      <div className="login-form-container">
        <div className='login-carousel'>
          <CarouselComponent />
        </div>
        <form className="form-container" onSubmit={submitForm}>
          <h1 className='Signup-header'>Welcome Back🖐️</h1>
          <p className='Signup-Par'>Your gateway to ordering top event services and products with ease</p>
          <div className="input-container">
            <input
              type="email"
              id="email"
              className="email-input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input-container password-container">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              id="password"
              className="password-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <button
            type="button"
            className="google-login-button"
            onClick={handleGoogleSignup}
          >
              <img src={require('../../assets/google.png')} alt="google"/>
            Sign in with Google
          </button>
          <Link to="/signup" className="Login-link">
            Don't have an account? <span className='Login-text'>Signup</span>
          </Link>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    </>
  );
};

export default LoginForm;