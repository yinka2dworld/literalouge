import '../css/Home.css'; 
import Search from '../layout/Search.jsx';
import Categories from '../layout/Categories.jsx'; 
import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';
import { useQuery } from '@apollo/client';
import { BOOKS } from '../graphql/queries.js';
import Books from '../layout/Books.jsx';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
    const role = localStorage.getItem('role');

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 9;

    const { loading, error, data } = useQuery(BOOKS, {
        variables: { page: currentPage, perPage },
    });

    if (error) return <p>Error: {error.message}</p>;

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < data.books.lastPage) {
            setCurrentPage((prev) => prev + 1);
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
                        {loading
                            ? Array.from({ length: perPage }).map((_, index) => (
                                  <div className="skeleton-card" key={index}>
                                      <Skeleton height={180} />
                                      <Skeleton width={`80%`} style={{ marginTop: '10px' }} />
                                      <Skeleton width={`60%`} />
                                  </div>
                              ))
                            : data.books.allBooks.map(({ id, bookCover, bookName, bookAuthor }) => (
                                  <Link className="catalog-link" onClick={(() =>window.scrollTo(0,0))} to={`/home/${id}`} key={id}>
                                      <Books
                                          bookCover={bookCover}
                                          bookName={bookName}
                                          bookAuthor={bookAuthor}
                                      />
                                  </Link>
                              ))}
                    </div>
        
                    {!loading && (
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
                                Page {currentPage} of {data.books.lastPage}
                            </span>
                            <button
                                className="pag"
                                onClick={handleNextPage}
                                disabled={currentPage === data.books.lastPage}
                                aria-label="Next page"
                            >
                                ►
                            </button>
                        </div>
                    )}
                </main>
            </div>
        
            {role != 'user' ? (
                <button className="addBook">
                    <Link onClick={() => window.scrollTo(0,0)} to={'/admin/addBook'} style={{ textDecoration: 'none', color: '#ffffff' }}>
                        +
                    </Link>
                </button>
            ) : null}
        
            <Footer />
        </div>
    );
};

export default Home;
