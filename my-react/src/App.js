import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Space from './pages/Space';
import Registor from './pages/Registor';
import Home from './pages/Home';
import WishPage from './pages/WishPage';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/space" element={<Space />} />
        <Route path="/register" element={<Registor />} />
        <Route path="/wish/:planetId" element={<WishPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
