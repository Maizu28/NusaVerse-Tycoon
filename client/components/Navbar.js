import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">NusaVerse Tycoon</Link>
      <ul>
        {user ? (
          <>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/bank">Bank</Link></li>
            <li><Link to="/market">Market</Link></li>
            <li><Link to="/my-shop">My Shop</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;