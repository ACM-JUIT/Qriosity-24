import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/LoginPage';
import Portal from './pages/Portal';
import SignUp from './pages/Signup';

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [hasCheckedScreenSize, setHasCheckedScreenSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 728;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    setHasCheckedScreenSize(true);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  if (!hasCheckedScreenSize) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <>
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
  <div className='border border-gray-500 rounded-[12px] p-4 inline-block bg-red-500 bg-opacity-50'>
    <p className='text-white inline'>This application is disabled for mobile devices.</p>
  </div>
</div>

          </>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
