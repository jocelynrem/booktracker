import React, { useState, useEffect } from 'react';
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
    <div>
      <Nav loggedIn={loggedIn} handleLoginLogout={loggedIn ? handleLogout : null} />
      {!loggedIn ? (
        <div className="flex justify-center mt-4">
          <Login handleLogin={handleLogin} />
        </div>
      ) : (
        <>
          <ScanISBN scanning={scanning} setScanning={setScanning} onDetected={() => setRefresh(!refresh)} />
          <BookList refresh={refresh} />
        </>
      )}
    </div>
  );
};

export default App;
