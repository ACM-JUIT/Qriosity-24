import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import bgimg from '../../assets/logo.png';

function LandingNavbar() {

  const location = useLocation();

  const isTabActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div className="font-montserrat">
      <nav className="flex flex-row items-center justify-between">
        <a href="/"><img src={bgimg} alt="" className="h-20 pt-6 pl-3 h-20 pt-6 pl-3 flex-shrink-0" /></a>
        <div className="flex flex-row text-white text-xl font-light mr-4 space-x-4">
          <NavItem to="/rules" isActive={isTabActive('/rules')} text="Rules" />
          <NavItem to="/aboutus" isActive={isTabActive('/aboutus')} text="About Us" />
          <NavItem to="/login" isActive={isTabActive('/login')} text="Log In" />
        </div>
      </nav>
    </div>
  );
}

const NavItem = ({ to, isActive, text }) => {
  return (
    <motion.div
      layout
      whileHover="whileHover"
      className={`${isActive ? 'border-b-2 border-white' : ''} transition duration-300`}
    >
      <Link to={to} className="p-3">
        <motion.p
          variants={{ whileHover: { textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' } }}
        >
          {text}
        </motion.p>
      </Link>
    </motion.div>
  );
};

export default LandingNavbar;