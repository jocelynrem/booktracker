// src/config.js
const config = {
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://booktracker.herokuapp.com/api'
        : 'http://127.0.0.1:8000/api',
};

export default config;
