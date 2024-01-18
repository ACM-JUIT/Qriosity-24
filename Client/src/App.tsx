import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/LoginPage';
import Portal from './pages/Portal';
import SignUp from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/portal" element={<Portal />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/leaderboard' element={<Leaderboard />} />

      </Routes>
      </Router>
      </>
  );
};

export default App;
