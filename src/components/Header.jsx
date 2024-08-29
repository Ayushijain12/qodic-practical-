import React from 'react';
import { useTheme } from './ThemeContext-temp';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import './styles.css'; // Import the CSS file for styling
import { useDispatch } from 'react-redux';
import { logout } from '../redux/Slice/authSlice';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={`header ${darkMode ? 'dark-mode' : ''}`}>
      <IconButton 
        color="inherit" 
        onClick={toggleTheme}
        className="icon-button"
      >
        {darkMode ? <LightModeIcon className="icon"/> : <DarkModeIcon className="icon"/>}
      </IconButton>
      <IconButton 
        color="inherit" 
        onClick={handleLogout}
        className="icon-button"
      >
        <LogoutIcon className="icon"/>
      </IconButton>
    </header>
  );
};

export default Header;
