import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import bannerImage from '../banner1.png'; // Import your banner image


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false); // State to control redirection

  useEffect(() => {
    // If shouldRedirect is true, redirect to the home page
    if (shouldRedirect) {
      window.location.href = '/'; // Or the path you want to redirect to
    }
  }, [shouldRedirect]); // This effect runs when shouldRedirect changes

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in with: ", userCredential.user);

      // Set success message and trigger redirection
      setMessage("You are logged in. Redirecting...");
      setTimeout(() => setShouldRedirect(true), 3000); // Wait for 3 seconds before redirecting
    } catch (error) {
      console.error("Error during login: ", error.message);
      setMessage(error.message); // Display error message
    }
  };

  return (
    
    <div className="login-container">
            <div className="banner-container">
        <img src={bannerImage} className="banner" alt="banner" />
      </div>
        <div className="form-wrapper">
            <h2>Login to your account</h2> {/* Heading added */}
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <div>{message}</div>} {/* Display the message */}
        </div>
    </div>
);
};

export default Login;


