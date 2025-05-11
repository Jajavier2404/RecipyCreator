import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Results from "../pages/Results"
import Favorites from "../pages/Favorites"
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/favorites" element={<Favorites />} />
        </Routes>
    );
}