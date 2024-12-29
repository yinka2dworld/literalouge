import React from 'react';
import '../css/layout.css';


const Books = (props) => {
    return (
        <div className="book-card">
            <img src={props.bookCover} alt="Book Cover" className="book-img" />
            <div className="book-info">
                <h2 style={{color:"#070C70", fontSize:"20px"}} className="book-title">{props.bookName}</h2>
                <p className="bookAuthor" >{props.bookAuthor}</p>
            </div>
        </div>
    );
}

export default Books;


