import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = ({ refresh }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/books/')
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    }, [refresh]); // Fetch data when `refresh` changes

    return (
        <div>
            <h1>My Library</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title || 'Untitled'} by {book.author || 'Unknown Author'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
