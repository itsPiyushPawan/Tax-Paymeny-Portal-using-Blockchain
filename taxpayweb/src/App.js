import React, { useState } from 'react';
import './App.css';
import HomePage from './components/hompage';
import SendEth from './components/PaymentForm';
import Login from './components/Login';
import SignUp from './components/signup';
import logo from './logo.png';
import bannerImage from './banner.png'; // Import your banner image


function App() {
  const [currentView, setCurrentView] = useState('home');

  const navigateTo = (view) => {
    setCurrentView(view);
  };



  return (
    <div className="App">
      <header className="header">
        <a href="http://localhost:3000/">
          <img src={logo} className="logo" alt="logo" />
        </a>
        <div className="logo-title">TaxGuard</div>
        <div className="nav-links">
          <button onClick={() => navigateTo('login')}>Login</button>
          <button onClick={() => navigateTo('signup')}>Signup</button>
        </div>
      </header>
      {currentView === 'payment' && <img src={bannerImage} className="banner" alt="banner" />}
      {/* Add the banner image below the navbar
      <img src={bannerImage} className="banner" alt="banner" /> */}

      <div className="content">
        {currentView === 'home' && <HomePage onPayTaxClick={() => navigateTo('payment')}/>}
        {currentView === 'payment' && <SendEth />}
        {currentView === 'login' && <Login />}
        {currentView === 'signup' && <SignUp />}
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} TaxGaurd. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
