import '../css/layout.css'; 
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { SEARCHBOOK } from '../graphql/queries.js';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Execute the query with the searchTerm as a variable
    const { loading, error, data } = useQuery(SEARCHBOOK, { 
        variables: { searchTerm },
        skip: !searchTerm 
    });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <div className="searchBar">
                <input 
                    type="text" 
                    className="search" 
                    placeholder="Search for books..." 
                    value={searchTerm} 
                    onChange={handleSearch} 
                />
            </div>

            <div className="searchResults">
                {loading && <h3>Loading...</h3>}
                {error && <p>Error: {error.message}</p>}
                
                {data && data.searchBooks && data.searchBooks.map((book) => (
                    <div className="searchResultItem" key={book.id}>
                        <a href={`/home/${book.id}`} className="searchResultLink">
                            {/* <img src={`http://localhost:3000/images/${book.bookPhoto}`} alt="searchImage" className="searchImage" /> */}
                            <span className="bookName">{book.bookName}</span>
                            <span className="bookAuthor">{book.bookAuthor}</span>
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Search;


