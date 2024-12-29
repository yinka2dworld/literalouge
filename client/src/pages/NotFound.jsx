import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound-container">
            <h1 className="notfound-header">404</h1>
            <p className="notfound-text">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="home-button">Go Back Home</Link>
        </div>
    );
}

export default NotFound;
