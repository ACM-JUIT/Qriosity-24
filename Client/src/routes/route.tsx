import { BrowserRouter, Route, Routes } from "react-router-dom";
import Leaderboard from "../pages/Leaderboard";
import Portal from "../pages/Portal";
import LandingPage from "../pages/LandingPage";

function Router() {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/portal' element={<Portal/>} />
                    <Route path='/leaderboard' element={<Leaderboard/>} />
                    <Route path='' element={<LandingPage/>} />
                </Routes>
        </BrowserRouter>
    );
}

export default Router;