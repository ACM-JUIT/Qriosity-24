import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import bgimg from '../../../public/logo.png';
import NavItemImg from './NavItem';

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isTabActive = (path: string) => {
    return location.pathname === path;
  };
//TODO: HAMBURGER NOT WORKING
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-montserrat">
      <nav className="flex flex-row justify-between items-center">
        <div className='acmLogo'>
          <NavItemImg to="" isActive={isTabActive('/')} img={bgimg} onClick={toggleMenu} />
        </div>
        <div className="flex flex-row text-white text-3xl font-semibold">
          <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
            <div className={`bar ${isMenuOpen ? 'bar-open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'bar-open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'bar-open' : ''}`}></div>
          </div>
          <div className={`lg:flex ${isMenuOpen ? 'flex' : 'hidden'} flex-row mt-4 lg:mt-0 mb-2 space-x-4 text-base`}>
            <NavItem to="/portal" isActive={isTabActive('/portal')} text="Questions" onClick={toggleMenu} />
            <NavItem to="/leaderboard" isActive={isTabActive('/leaderboard')} text="Leaderboard" onClick={toggleMenu} />
            <NavItem to="/profile" isActive={isTabActive('/profile')} text="Profile" onClick={toggleMenu} />
            <NavItem to="/logout" isActive={isTabActive('/logout')} text="Logout" onClick={toggleMenu} />
</div>
        </div>
      </nav>
    </div>
  );
}

interface NavItemProps {
  to: string;
  isActive: boolean;
  text: string;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, isActive, text, onClick }) => {
  return (
    <motion.div
      layout
      whileHover="whileHover"
      className={`${isActive ? 'border-b-2 border-white' : ''} transition duration-300`}
    >
      <Link to={to} className="p-8 hover:animate-pulse" onClick={onClick}>
        <motion.p
          variants={{ whileHover: { textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' } }}
        >
          {text}
        </motion.p>
      </Link>
    </motion.div>
  );
};

export default Navbar;
