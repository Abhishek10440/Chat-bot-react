import { useState } from 'react';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import './Darkmode.css';

const Darkmode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme') || 'lightmode';
      document.body.className = savedMode;
      return savedMode === 'darkmode';
    }
    return false;
  });

  const toggle = () => {
    const newMode = darkMode ? 'lightmode' : 'darkmode';
    setDarkMode(!darkMode);
    document.body.className = newMode;
    localStorage.setItem('theme', newMode);
  };

  return (
    <button className="dark-mode-toggle" onClick={toggle} title="Toggle theme">
      {darkMode ? <IoMdSunny /> : <IoMdMoon />}
    </button>
  );
};

export default Darkmode;
