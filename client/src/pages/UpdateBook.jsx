import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';
import { UPDATEBOOK } from '../graphql/mutations.js';
import { BOOK } from '../graphql/queries.js';

const UpdateBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    bookCover: null,
    bookName: '',
    bookDescription: '',
    bookAuthor: '',
    bookCategory: '',
    bookLanguage: '',
    bookFile: null,
  });

  const [updateBook, { loading: updateLoading, error: updateError }] = useMutation(UPDATEBOOK);

  const { loading: queryLoading, error: queryError, data } = useQuery(BOOK, {
    variables: { bookId },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (data && data.book) {
      setFormData({
        bookCover: null,
        bookName: data.book.bookName || '',
        bookDescription: data.book.bookDescription || '',
        bookAuthor: data.book.bookAuthor || '',
        bookCategory: data.book.bookCategory || '',
        bookLanguage: data.book.bookLanguage || '',
        bookFile: null,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await updateBook({
        variables: {
          updateBookId: bookId,
          updatebook: {
            bookCover: formData.bookCover,
            bookName: formData.bookName,
            bookDescription: formData.bookDescription,
            bookAuthor: formData.bookAuthor,
            bookCategory: formData.bookCategory,
            bookLanguage: formData.bookLanguage,
            bookFile: formData.bookFile,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      if (data?.updateBook?.success) {
        alert("Book updated successfully!");
        navigate("/home");
      } else {
        alert(data?.updateBook?.message || "Failed to update the book.");
      }
    } catch (error) {
      console.error('Error updating book:', error.message);
      alert('An error occurred while updating the book. Please try again.');
    }
  };

  const categories = [
    'Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Fantasy', 'Education',
  ];

  const africanLanguages = [
    'Swahili', 'Yoruba', 'Zulu', 'Amharic', 'Hausa', 'Somali', 'Shona', 'Oromo', 
    'Igbo', 'Fulani', 'Wollof', 'Xhosa', 'Afar', 'Akan',
  ];

  return (
    <div className="container">
      <Navbar />
      <div className="form-container">
        <h2>Update Book</h2>

        {queryError && (
          <p className="errorMsg">
            {queryError.message || 'An unexpected error occurred while fetching book data.'}
          </p>
        )}
        {updateError && (
          <p className="errorMsg">
            {updateError.message || 'An error occurred while updating the book.'}
          </p>
        )}

        {queryLoading ? (
          <p style={{textAlign: 'center', paddingBottom:'30px'}}>Loading book details...</p>
        ) : (
          <form className="create" onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="bookCover" className="label">Book Cover</label>
              <input
                type="file"
                name="bookCover"
                accept=".png, .jpg, .jpeg"
                className="input-text"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookName" className="label">Book Name</label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                className="input-text"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookAuthor" className="label">Author</label>
              <input
                type="text"
                name="bookAuthor"
                value={formData.bookAuthor}
                className="input-text"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookDescription" className="label">Description</label>
              <textarea
                name="bookDescription"
                value={formData.bookDescription}
                className="input-textarea"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookCategory" className="label">Category</label>
              <select
                name="bookCategory"
                value={formData.bookCategory}
                className="input-select"
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bookLanguage" className="label">Language</label>
              <select
                name="bookLanguage"
                value={formData.bookLanguage}
                className="input-select"
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select a language</option>
                {africanLanguages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bookFile" className="label">Book File</label>
              <input
                type="file"
                name="bookFile"
                accept=".pdf, .epub"
                className="input-text"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn-submit" disabled={updateLoading}>
                {updateLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UpdateBook;




