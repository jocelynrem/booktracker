import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const BookList = ({ refresh }) => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/books/')
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    }, [refresh]); // Fetch data when `refresh` changes

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

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
        (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">My Library</h1>
            <div className="flex items-center mb-4">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-4 py-2 border rounded-lg w-full"
                />
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th
                            onClick={() => requestSort('title')}
                            className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            Title
                            {sortConfig.key === 'title' && (
                                sortConfig.direction === 'ascending' ?
                                    <ChevronUpIcon className="h-5 w-5 inline ml-2" /> :
                                    <ChevronDownIcon className="h-5 w-5 inline ml-2" />
                            )}
                        </th>
                        <th
                            onClick={() => requestSort('author')}
                            className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            Author
                            {sortConfig.key === 'author' && (
                                sortConfig.direction === 'ascending' ?
                                    <ChevronUpIcon className="h-5 w-5 inline ml-2" /> :
                                    <ChevronDownIcon className="h-5 w-5 inline ml-2" />
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map(book => (
                        <tr key={book.id}>
                            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                {book.title || 'Untitled'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                {book.author || 'Unknown Author'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
