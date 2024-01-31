import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import bgimg from '../../../public/logo.png';

const NavItem = ({ to, isActive, text }) => {
  const containerVariants = {
    whileHover: { textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }
  };

  return (
    <motion.div
      layout
      whileHover="whileHover"
      className={`${
        isActive ? 'border-b-2 border-white' : ''
      } transition duration-300`}
    >
      <Link to={to} className="p-3">
        <motion.p variants={containerVariants}>{text}</motion.p>
      </Link>
    </motion.div>
  );
};

const LandingNavbar = () => {
  const location = useLocation();

  const isTabActive = (path) => location.pathname === path;

  const navItems = [
    { to: '/Portal', text: 'Quiz' },
    { to: '/leaderboard', text: 'LeaderBoard' },
    { to: '/profile', text: 'Profile' },
  ];

  return (
    <div className="font-montserrat">
      <nav className="flex flex-row items-center justify-between">
        <Link to="#">
          <img src={bgimg} alt="" className="h-20 pt-6 pl-3 flex-shrink-0" />
        </Link>
        <div className="flex flex-row text-white text-xl font-light mr-4 space-x-4">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              isActive={isTabActive(item.to)}
              text={item.text}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default LandingNavbar;
