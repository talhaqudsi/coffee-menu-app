import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react';

import Home from './pages/Home';
import OrderPage from './pages/OrderPage';
import './App.css';

function Header() {
  const { user } = useUser();

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/order" className="nav-link">Order</Link>

        <div className="auth-section">
          <SignedOut>
            <SignInButton />
          </SignedOut>

          <SignedIn>
            <span className="user-greeting">Hello, {user?.firstName || user?.username}</span>
            <UserButton />
            <SignOutButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </>
  );
}

export default App;
