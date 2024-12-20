import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import bannerImage from '../banner2.png'; // Import your banner image
import './signup.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false); // State to control redirection

  useEffect(() => {
    // If shouldRedirect is true, redirect to the home page
    if (shouldRedirect) {
      window.location.href = '/'; // Change to your desired path
    }
  }, [shouldRedirect]); // This effect runs when shouldRedirect changes

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created: ", userCredential.user);

      // After successful signup, save additional user data to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        // Add additional fields as needed
      });

      setMessage("User Registered. Redirecting...");
      setTimeout(() => setShouldRedirect(true), 3000); // Trigger redirection after a delay
    } catch (error) {
      console.error("Error during signup: ", error.message);
      setMessage(error.message);
    }
  };

  return (
    <div className="login-container"> {/* Consider renaming this class to something more generic like 'form-container' */}

        <div className="form-wrapper">
            <h2>Sign Up for an Account</h2> {/* Adjust the heading as needed */}
            <form className="login-form" onSubmit={handleSignUp}>
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
                <button type="submit">Sign Up</button>
            </form>
            {message && <div>{message}</div>} {/* Display the message */}
        </div>
        <div className="banner-container">
        <img src={bannerImage} className="banner" alt="banner" />
      </div>
    </div>
);
};

export default SignUp;