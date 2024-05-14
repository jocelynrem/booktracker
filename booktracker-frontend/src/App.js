import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
import ScanISBN from './components/ScanISBN';
import BookList from './components/BookList';
import Button from './components/Button';
import './App.css';

const App = () => {
  const [scanResult, setScanResult] = useState('');
  const [scanning, setScanning] = useState(false);
  const [refresh, setRefresh] = useState(false); // State to trigger refresh

  useEffect(() => {
    // WebSocket or other initialization can go here if needed
  }, []);

  const handleDetected = (isbn) => {
    setScanResult(isbn);
    console.log(`ISBN Detected: ${isbn}`);
  };

  const addBook = () => {
    console.log(`Adding book with ISBN: ${scanResult}`);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/books/`, { isbn: scanResult })
      .then(response => {
        if (response.data) {
          console.log('Book added:', response.data);
          setScanResult('');
          setRefresh(!refresh); // Toggle refresh state to trigger update
        } else {
          console.error('No data in response:', response);
        }
      })
      .catch(error => {
        console.error('Error adding book:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow p-6 rounded-lg mb-4">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold text-gray-800">Book Tracker</h1>
          <div className="ml-auto">
            <ScanISBN onDetected={handleDetected} scanning={scanning} setScanning={setScanning} />
          </div>
        </div>
        {scanResult && (
          <div className="mt-2">
            <p className="text-lg text-gray-700">Scanned ISBN: {scanResult}</p>
            <Button
              className="px-3.5 py-2.5 text-sm font-semibold"
              onClick={addBook}
              icon={PlusIcon}
            >
              Add Book
            </Button>
          </div>
        )}
      </header>
      <main>
        <BookList refresh={refresh} />
      </main>
    </div>
  );
};

export default App;
