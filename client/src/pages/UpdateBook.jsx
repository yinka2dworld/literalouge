import { gql, useMutation } from '@apollo/client';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';
import { UPDATEBOOK } from '../graphql/mutations.js';

const UpdateBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookCover: null,
    bookName: '',
    bookDescription: '',
    bookAuthor: '',
    bookCategory: '',
    bookLanguage: '',
    bookFile: null,
  });

  const [updateBook, { loading, error }] = useMutation(UPDATEBOOK);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFileUpload = async (file) => {
    if (!file) return null;
    return file.name; 
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const bookCover = await handleFileUpload(formData.bookCover);
    const bookFile = await handleFileUpload(formData.bookFile);

    try {
      const { data } = await updateBook({
        variables: {
          updateBookId: bookId,
          updatebook: {
            bookCover,
            bookName: formData.bookName,
            bookDescription: formData.bookDescription,
            bookAuthor: formData.bookAuthor,
            bookCategory: formData.bookCategory,
            bookLanguage: formData.bookLanguage,
            bookFile,
          },
        },
        context: {
          headers: {
            Authorization: 'Bearer '+token,
          },
        },
      });

      if (data.updateBook.success) {
        alert('Book updated successfully!');
        navigate('/home'); // Navigate to the home page or book list.
      } else {
        alert(data.updateBook.message || 'Failed to update the book.');
      }
    } catch (error) {
      console.error('Error updating book:', error.message);
      alert('An error occurred while updating the book. Please try again.');
    }
  };

  const categories = [
    'Fiction',
    'Non-Fiction',
    'Science',
    'History',
    'Biography',
    'Fantasy',
    'Education',
  ];

  const africanLanguages = [
    'Swahili',
    'Yoruba',
    'Zulu',
    'Amharic',
    'Hausa',
    'Somali',
    'Shona',
    'Oromo',
    'Fulbe',
    'Wollof',
    'Xhosa',
    'Afar',
    'Akan',
  ];

  return (
    <div className="container">
      <Navbar />
      <div className="form-container">
        <h2>Update Book</h2>
        {error && (
          <p className="errorMsg">
            {error.message || 'An unexpected error occurred.'}
          </p>
        )}
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
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateBook;
