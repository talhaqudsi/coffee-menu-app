import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const Home = () => {
  return (
    <div className="home">
      <h1 className="center-title">Welcome to the Cozy Coffee Corner ☕</h1>
      <p>Your cozy destination for delicious brews!</p>
      <Link to="/menu">
      <SignedIn>
          <button>View and Edit Menu</button>
      </SignedIn>
      <SignedOut>
          <button>View Our Menu</button>
      </SignedOut>
      </Link>
    </div>
  );
};

export default Home;