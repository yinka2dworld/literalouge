import '../css/layout.css';

const Books = ({ bookCover, bookName, bookAuthor }) => {
    return (
        <div className="book-card">
            {/* Book Cover */}
            <img 
                src={bookCover} 
                alt={`${bookName} Cover`} 
                className="book-img" 
            />

            {/* Book Information */}
            <div className="book-info">
                <h2 
                    className="book-title" 
                    style={{ color: "#070C70", fontSize: "20px" }}
                >
                    {bookName}
                </h2>
                <p className="book-author">{bookAuthor}</p>
            </div>
        </div>
    );
};

export default Books;


