import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Results from "../pages/Results"
import Favorites from "../pages/Favorites"
import Login from "../pages/login";
import SignUp from "../pages/signUp";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
        </Routes>
    );
}