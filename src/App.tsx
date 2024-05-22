import * as React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from './pages/NotFound';
import About from "./pages/About";
import PrivateRoute from './components/PrivateRoute';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/" element={<About />} />
                <Route path="/main" element={<PrivateRoute  />}>
                    <Route path="" element={<Home />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}