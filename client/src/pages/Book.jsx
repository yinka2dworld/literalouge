import '../css/Book.css';
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';
import { useQuery, useMutation } from '@apollo/client';
import { BOOK } from '../graphql/queries.js';
import { DELETEBOOK } from '../graphql/mutations.js';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Book = () => {
  const { bookId } = useParams(); // Get bookId from the route
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Fetch user role
  const token = localStorage.getItem('token');

  // Fetch book data
  const { loading, error, data } = useQuery(BOOK, {
    variables: { 
      bookId,
    },
    context: {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  });
   const book = data?.book;

  const [deleteBook] = useMutation(DELETEBOOK);
  
  const handleDelete = async () => {
    if (!bookId) {
      alert('Invalid book ID.');
      return;
    }

    try {
      const { data } = await deleteBook({
        variables: { deleteBookId: bookId },
        context: {
          headers: {
            Authorization: 'Bearer '+token
          },
        },
      });
      if (data?.deleteBook?.success) {
        alert('Book deleted successfully!');
        navigate('/home');
      } else {
        alert(data?.deleteBook?.message || 'Failed to delete the book.');
      }
    } catch (err) {
      console.error('Error deleting book:', err);
      alert('An error occurred while deleting the book. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleUpdate = () => {
    navigate(`/admin/updateBook/${bookId}`);
  };

  const handleDownload = () => {
    const pdfUrl = book.bookFile;
    const pdfName = `literalouge.com ${book.bookName+' - '+book.bookAuthor|| 'book'}.pdf`;
    if (!pdfUrl) {
      alert('File not available for download.');
      return;
    }
    saveAs(pdfUrl, pdfName); 
  };

  return (
    <div>
      <Navbar />

      <div className="book-detail">
        <img
          src={book.bookCover} 
          alt={book.bookName}
          className="book-photo"
        />

        <div className="book-info">
          <h1 className="book-title">{book.bookName}</h1>
          <p className="book-author">by {book.bookAuthor}</p>
        </div>

        <div style={{backgroundColor:'white', marginBottom:'20px'}}>
                 <h3 style={{paddingTop:'20px',textAlign:'center', color:'#ff1493'}}>We need your support!</h3>
            <Link  className='donate-msg'  to='/donate' style={{ color:'#070C70'}}> 
        <p style={{ fontSize:'20px', textAlign:'center', paddingBottom:'40px'}}>
        Kindly click here to support us with a donation, helping us continue 
        providing free access to an exceptional collection of African Literature.
            <br/> Gracious <VolunteerActivismIcon fontSize="medium" style={{ fill:' #ff1493',  }} /> </p>
        </Link>  
           </div>

        <div className="book-description">
          <h3>Description</h3>
          <p className='desc'>{book.bookDescription}</p>
        </div>

        <div className="book-meta">
          <p><strong>Category:</strong> {book.bookCategory}</p>
          <p><strong>Language:</strong> {book.bookLanguage}</p>
        </div>

        <div className="buttons-div">
          {/* Download button */}
          <button onClick={handleDownload} disabled={loading}  className="book-link">
            Download 
          </button>

          {/* Admin icons for delete and edit */}
          {(role === 'admin' || role === 'superAdmin') && (
            <div className="admin-icons">
              <FaTrash
                className="icon delete-icon"
                title="Delete Book"
                onClick={handleDelete}
              />
              <FaEdit
                className="icon edit-icon"
                title="Update Book"
                onClick={handleUpdate}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Book;
