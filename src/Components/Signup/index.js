import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { useAuth } from "../AuthProvider/index";
import app from "../firebasesetup/app";
import CarouselComponent from "../signupCarousel";
import PrivateHeader from '../PrivateHeader';
import './index.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showReenterPassword, setShowReenterPassword] = useState(false);
    const [isPasswordEntered, setIsPasswordEntered] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const auth = getAuth(app);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            window.location.href = "/"; // Redirect to the home route if user is logged in
        }
    }, [currentUser]);

    const handleSignup = (event) => {
        event.preventDefault();
        if (password === reenterPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User created:", user);
                    setSuccess("User successfully created!");
                    setError("");
                    window.location.href = "/"; // Redirect to the home route after successful signup
                })
                .catch((error) => {
                    setError(error.message);
                    setSuccess("");
                });
        } else {
            setError('Passwords do not match');
        }
    };

    const handleGoogleSignup = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Google sign-up successful:", user);
                setSuccess("Google sign-up successful!");
                setError("");
                window.location.href = "/"; // Redirect to the home route after successful signup
            })
            .catch((error) => {
                console.error("Google sign-up error:", error);
                setError(error.message);
                setSuccess("");
            });
    };

    return (
        <>
            <PrivateHeader />
            <div className='signup-container'>
                <div className="signup-customer-container">
                    <div className="signup-image-container">
                        <CarouselComponent />
                    </div>

                    <form onSubmit={handleSignup} className="signup-customer-form">
                        <div className="signup-customer-group">
                            <h1 className='Signup-header'>Welcome to Evobuz</h1>
                            <p className='Signup-Par'>Your gateway to ordering top event services and products with ease</p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="signup-customer-input"
                                placeholder='Email'
                            />
                        </div>
                        <div className="signup-customer-group">
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setIsPasswordEntered(e.target.value.length > 0);
                                    }}
                                    required
                                    className="signup-customer-input"
                                    placeholder='Password'
                                />
                                <span
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        {isPasswordEntered && (
                            <div className="signup-customer-group">
                                <div className="password-container">
                                    <input
                                        type={showReenterPassword ? "text" : "password"}
                                        value={reenterPassword}
                                        onChange={(e) => setReenterPassword(e.target.value)}
                                        required
                                        className="signup-customer-input"
                                        placeholder='Re-Password'
                                    />
                                    <span
                                        className="password-toggle"
                                        onClick={() => setShowReenterPassword(!showReenterPassword)}
                                    >
                                        {showReenterPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        )}
                        <button type="submit" className="signup-customer-button">Sign Up</button>
                        {error && <p className="signup-error">{error}</p>}
                        {success && <p className="signup-success">{success}</p>}

                        <button type="button" className="google-signup-button" onClick={handleGoogleSignup}>
                        <img src={require('../../assets/google.png')} alt="google"/>
                            Continue with Google
                        </button>

                        <Link to="/login" className="Login-link">
                            Already a Member? <span className='Login-text'>Login Here</span>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;