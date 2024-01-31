
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutUs from "./pages/AboutUs";
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/LoginPage';
import Portal from './pages/Portal';
import Profile from './pages/Profile';
import Rules from "./pages/Rules";
import Sign from './pages/Sign';
import SignUp from './pages/Signup';

const App = () => {
  
  return (
    <>
        <Router>
          <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sign" element={<Sign />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/rules' element={<Rules/>} />
            <Route path='/aboutus' element={<AboutUs/>} />
          </Routes>
        </Router>
    </>
  );
};

export default App;
