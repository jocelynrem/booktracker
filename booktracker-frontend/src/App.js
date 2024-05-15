// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav';
import BookList from './components/BookList';
import ScanISBN from './components/ScanISBN';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div>
        <Nav loggedIn={loggedIn} handleLoginLogout={loggedIn ? handleLogout : null} />
        <Routes>
          <Route path="/login" element={!loggedIn ? <Login handleLogin={handleLogin} /> : <Navigate to="/books" />} />
          <Route path="/register" element={!loggedIn ? <Register setLoggedIn={setLoggedIn} /> : <Navigate to="/books" />} />
          <Route path="/books" element={loggedIn ? (
            <>
              <ScanISBN scanning={scanning} setScanning={setScanning} onDetected={() => setRefresh(!refresh)} />
              <BookList refresh={refresh} />
            </>
          ) : (
            <Navigate to="/login" />
          )} />
          <Route path="/" element={<Navigate to={loggedIn ? "/books" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
