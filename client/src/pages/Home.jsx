import '../css/Home.css'; 
import Search from '../layout/Search.jsx';
import Categories from '../layout/Categories.jsx'; 
import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';
import { useQuery } from '@apollo/client';
import { BOOKS } from '../graphql/queries.js';
import Books from '../layout/Books.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
    const role = localStorage.getItem('role');

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 9;

    const { loading, error, data } = useQuery(BOOKS, {
        variables: { page: currentPage, perPage },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { allBooks, previousPage, nextPage, lastPage } = data.books;

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(previousPage);
        }
    };

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage(nextPage);
        }
    };

    return (
        <div className="home">
        <Navbar />
        <Search />
        
        <div className="content">
            <aside className="categories-sidebar">
                <Categories />
            </aside>
    
            <main className="catalog-section">
                <div className="catalog-grid">
                    {allBooks.map(({ id, bookCover, bookName, bookAuthor }) => (
                        <Link className="catalog-link" to={`/home/${id}`} key={id}>
                            <Books
                                bookCover={bookCover}
                                bookName={bookName}
                                bookAuthor={bookAuthor}
                            />
                        </Link>
                    ))}
                </div>
    
                <div className="pagination">
                    <button
                        className="pag"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                    >
                        ◄
                    </button>
                    <span className="page-number">
                        Page {currentPage} of {lastPage}
                    </span>
                    <button
                        className="pag"
                        onClick={handleNextPage}
                        disabled={currentPage === lastPage}
                        aria-label="Next page"
                    >
                        ►
                    </button>
                </div>
            </main>
        </div>
    
        {role ? (
            <button className="addBook">
                <Link to={'/admin/addBook'} style={{ textDecoration: 'none', color: '#ffffff' }}>
                    +
                </Link>
            </button>
        ) : null}
    
        <Footer />
    </div>
    
    );
};

export default Home;
