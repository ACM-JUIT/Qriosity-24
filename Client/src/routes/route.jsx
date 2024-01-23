import { BrowserRouter, Route, Routes } from "react-router-dom";
import Leaderboard from "../pages/Leaderboard";
import Portal from "../pages/Portal";
import Profile from "../pages/Profile";
import AboutUs from "../pages/AboutUs";
import Rules from "../pages/Rules";

function Router() {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/portal' element={<Portal/>} />
                    <Route path='/leaderboard' element={<Leaderboard/>} />
                    <Route path='/profile' element={<Profile/>} />
                    <Route path='/rules' element={<Rules/>} />
                    <Route path='/aboutus' element={<AboutUs/>} />
                </Routes>
        </BrowserRouter>
    );
}

export default Router;