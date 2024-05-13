import React, { useState } from 'react';
import axios from 'axios';
import ScanISBN from './components/ScanISBN';
import BookList from './components/BookList';
import './App.css';

const App = () => {
  const [isbn, setIsbn] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [refresh, setRefresh] = useState(false); // State to trigger refresh

  const handleDetected = (isbn) => {
    setScanResult(isbn);
    console.log(`ISBN Detected: ${isbn}`);
  };

  const addBook = () => {
    console.log(`Adding book with ISBN: ${scanResult}`);
    axios.post('http://127.0.0.1:8000/api/books/', { isbn: scanResult })
      .then(response => {
        console.log('Book added:', response.data);
        setScanResult('');
        setRefresh(!refresh); // Toggle refresh state to trigger update
      })
      .catch(error => {
        console.error('Error adding book:', error);
        console.error('Response data:', error.response.data);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Tracker</h1>
        <ScanISBN onDetected={handleDetected} />
        {scanResult && (
          <div>
            <p>Scanned ISBN: {scanResult}</p>
            <button onClick={addBook}>Add Book</button>
          </div>
        )}
        <BookList refresh={refresh} />
      </header>
    </div>
  );
};

export default App;
