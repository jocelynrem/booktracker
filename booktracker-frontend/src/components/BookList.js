// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const BookList = ({ refresh }) => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get(`${config.baseURL}/books/`, {
                    headers: {
                        'Authorization': `Token ${token}` // Include the token in the headers
                    }
                });
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books', error);
            }
        };

        fetchBooks();
    }, [refresh]);

    const sortedBooks = [...books].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredBooks = sortedBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Library</h1>
            <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mb-4 px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <table className="min-w-full bg-white border rounded-md shadow-md">
                <thead>
                    <tr>
                        <th
                            onClick={() => requestSort('title')}
                            className="cursor-pointer px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Title {sortConfig.key === 'title' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                        <th
                            onClick={() => requestSort('author')}
                            className="cursor-pointer px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Author {sortConfig.key === 'author' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map(book => (
                        <tr key={book.id}>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-no-wrap">{book.title || 'Untitled'}</td>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-no-wrap">{book.author || 'Unknown Author'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
