import '../css/AddBook.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADDBOOK } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const AddBook = () => {
  const navigate = useNavigate();

  // Initialize state for form inputs
  const [formData, setFormData] = useState({
    bookCover: null,
    bookName: '',
    bookDescription: '',
    bookAuthor: '',
    bookCategory: '',
    bookLanguage: '',
    bookFile: null,
  });

  // Mutation hook with loading and error tracking
  const [addBook, { loading: addingBook, error: addBookError }] = useMutation(ADDBOOK);

  // Handle changes for text and file inputs
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Stub for file upload processing (if needed)
  const handleFileUpload = async (file) => {
    if (!file) return null;
    // You can add file preprocessing here if needed.
    return file;
  };

  // Form submission handler for adding a book
  const bookAdder = async (e) => {
    e.preventDefault();
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');
      
      // Process file uploads (this can be replaced with actual logic)
      const bookCover = await handleFileUpload(formData.bookCover);
      const bookFile = await handleFileUpload(formData.bookFile);

      // Execute the mutation with variables and pass the token in the context
      const { data } = await addBook({
        variables: {
          addbook: {
            bookName: formData.bookName,
            bookDescription: formData.bookDescription,
            bookAuthor: formData.bookAuthor,
            bookCategory: formData.bookCategory,
            bookLanguage: formData.bookLanguage,
            bookCover,
            bookFile,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      console.log('Book added successfully!', data);
      navigate('/home');
    } catch (err) {
      console.error('Error adding book:', err.message);
    }
  };

  // Sample category and language arrays
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
        <h2>Add a New Book</h2>
        {addBookError && (
          <p className="errorMsg">
            {addBookError.message || 'An unexpected error occurred.'}
          </p>
        )}
        <form className="create" onSubmit={bookAdder}>
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
          <div className="form-row">
            <div className="form-group half-width">
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
            <div className="form-group half-width">
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
          </div>
          <div className="form-row">
            <div className="form-group half-width">
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
            <div className="form-group half-width">
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
            <button type="submit" className="btn-submit" disabled={addingBook}>
              {addingBook ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddBook;
