import { BrowserRouter, Route, Routes } from "react-router-dom";
import Leaderboard from "../pages/Leaderboard";
import Portal from "../pages/Portal";

function Router() {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/portal' element={<Portal/>} />
                    <Route path='/leaderboard' element={<Leaderboard/>} />
                </Routes>
        </BrowserRouter>
    );
}

export default Router;