import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1 className="center-title">Welcome to the Cozy Coffee Corner ☕</h1>
      <p>Your cozy destination for delicious brews!</p>
      <Link to="/order">
        <button>Place Your Order</button>
      </Link>
    </div>
  );
};

export default Home;