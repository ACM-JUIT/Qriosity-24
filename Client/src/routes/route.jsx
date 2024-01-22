import { BrowserRouter, Route, Routes } from "react-router-dom";
import Leaderboard from "../pages/Leaderboard";
import Portal from "../pages/Portal";
import Profile from "../pages/Profile";

function Router() {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/portal' element={<Portal/>} />
                    <Route path='/leaderboard' element={<Leaderboard/>} />
                    <Route path='/profile' element={<Profile/>} />
                </Routes>
        </BrowserRouter>
    );
}

export default Router;