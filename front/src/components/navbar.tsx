import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserReducer, selectUser } from '../lib/redux/userReducer';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const isAuthenticated = useSelector(selectUser).isLogged;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutUserReducer());
    navigate("/login")
  }

  const navLogin = () => {
    navigate("/login")
  }

  const navRegister = () => {
    navigate("/")
  }

  return (
    <nav className='navbar'>
      {isAuthenticated ? (
        <ul>
          <li>Accueil</li>
          <li onClick={handleLogout}>Déconnexion</li>
        </ul>
      ) : (
        <ul>
          <li onClick={navLogin}>Connexion</li>
          <li onClick={navRegister}>Inscription</li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
