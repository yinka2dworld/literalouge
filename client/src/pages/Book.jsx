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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Book = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const { loading, error, data } = useQuery(BOOK, {
    variables: { bookId },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
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

  const handleUpdate = () => {
    navigate(`/admin/updateBook/${bookId}`);
  };

  const handleDownload = () => {
    const pdfUrl =book?.bookFile;
    const extension = book.bookFile.split('.').pop();
    const pdfName = `${book?.bookName}(literalouge.com).${extension}`;

    if (!pdfUrl) {
      alert('File not available for download.');
      return;
    }

    saveAs(pdfUrl, pdfName);
  };
 

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Navbar />

      <div className="book-detail">
        {loading?
          <div className="loading-skeleton">
          <Skeleton height={400} width="100%" />
          <Skeleton count={3} height={20} width="80%" style={{ margin: '10px auto' }} />
        </div>
        :(
          <>
            {/* Book Cover */}
            <img
              src={book.bookCover}
              alt={book.bookName}
              className="book-photo"
            />

            {/* Book Info */}
            <div className="book-info">
              <h1 className="book-title">{book.bookName}</h1>
              <p className="book-author">by {book.bookAuthor}</p>
            </div>

            {/* Donation Section */}
            <div className="donation-section">
              <h3 className="donation-header">We need your support!</h3>
              <Link onClick={(() => window.scrollTo(0,0))} className="donate-msg" to="/donate">
                <p>
                  Kindly click here to support us with a donation, helping us
                  continue providing free access to an exceptional collection of
                  African Literature. <VolunteerActivismIcon fontSize='medium' className="icon" style={{fill:'#ff1493'}} />
                </p>
              </Link>
            </div>

            {/* Book Description */}
            <div className="book-description">
              <h3>Description</h3>
              <p>{book.bookDescription}</p>
            </div>

            {/* Book Meta Info */}
            <div className="book-meta">
              <p>
                <strong>Category:</strong> {book.bookCategory}
              </p>
              <p>
                <strong>Language:</strong> {book.bookLanguage}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="buttons-div">
              <button
                onClick={handleDownload}
                disabled={loading}
                className="book-link"
              >
                Download
              </button>

              {role &&  (role === 'superAdmin') && (
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
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Book;
