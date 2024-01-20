import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import bgimg from '../../../public/logo.png';

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
      <nav className="flex flex-row items-center">
        <img src={bgimg} alt="" className="h-20 pt-6 pl-3" />
        <div className="mx-auto flex flex-row text-white text-3xl font-semibold">
          <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
            <div className={`bar ${isMenuOpen ? 'bar-open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'bar-open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'bar-open' : ''}`}></div>
          </div>
          <div className={`lg:flex ${isMenuOpen ? 'flex' : 'hidden'} flex-row mt-4 lg:mt-0`}>
            <NavItem to="/portal" isActive={isTabActive('/portal')} text="Questions" onClick={toggleMenu} />
            <div className="mx-4"></div>
            <NavItem to="/leaderboard" isActive={isTabActive('/leaderboard')} text="Leaderboard" onClick={toggleMenu} />
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
