import { AuthenticationError } from 'apollo-server-express';
import { uploadToCloudinary, deleteFileFromCloudinary } from "../config/upload.js";
import Book from "../models/book.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GraphQLUpload } from 'graphql-upload';
import { Op } from 'sequelize';

export const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    books: async (_, { page = 1, perPage = 9 }) => {
      try {
        const offset = (page - 1) * perPage;
        const { rows: allBooks, count: totalBooks } = await Book.findAndCountAll({
          order: [['createdAt', 'DESC']],
          limit: perPage,
          offset,
        });
        return {
          allBooks,
          currentPage: page,
          previousPage: page - 1,
          nextPage: page + 1,
          lastPage: Math.ceil(totalBooks / perPage),
        };
      } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('Unable to fetch books at the moment');
      }
    },

    book: async (_, { id }) => {
      try {
        const data = await Book.findOne({ where: { id } });
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    users: async () => {
      if (!req || !req.user) {
        throw new AuthenticationError('Not authenticated');
      }
      try {
        const data = await User.findAll();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    user: async (_, { id }) => {
      if (!req || !req.user) {
        throw new AuthenticationError('Not authenticated');
      }
      try {
        const data = await User.findOne({ where: { id } });
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    searchBooks: async (_, { searchTerm }) => {
      try {
        const lowerCaseSearchTerm = `%${searchTerm.toLowerCase()}%`;
        const books = await Book.findAll({
          where: {
            [Op.or]: [
              { bookName: { [Op.like]: lowerCaseSearchTerm } },
              { bookAuthor: { [Op.like]: lowerCaseSearchTerm } },
              { bookDescription: { [Op.like]: lowerCaseSearchTerm } }
            ]
          }
        });
        return books;
      } catch (error) {
        throw new Error("Error fetching books: " + error.message);
      }
    },
  },

  Mutation: {

    addBook: async (_, { addbook }, { req }) => {
      // Manual authentication check – only protected mutations need this
      if (!req || !req.user) {
        throw new AuthenticationError('Not authenticated');
      }
      try {
        const {
          bookCover,
          bookName,
          bookDescription,
          bookAuthor,
          bookCategory,
          bookLanguage,
          bookFile,
        } = addbook;
        
        // Validate required fields (except files)
        if (!bookName || !bookDescription || !bookAuthor || !bookCategory || !bookLanguage) {
          throw new Error("All required fields (except files) must be provided.");
        }
        
        let bookCoverUrl = null;
        let bookFileUrl = null;
        const uploadPromises = [];
        
        // Process file uploads concurrently, if provided
        if (bookCover) {
          uploadPromises.push(
            uploadToCloudinary(bookCover).then(url => { bookCoverUrl = url; })
          );
        }
        if (bookFile) {
          uploadPromises.push(
            uploadToCloudinary(bookFile).then(url => { bookFileUrl = url; })
          );
        }
        if (uploadPromises.length > 0) {
          await Promise.all(uploadPromises);
        }
        
        console.log("Authenticated user:", req.user);
        
        // Create the new book record in the database
        const newBook = await Book.create({
          bookCover: bookCoverUrl,
          bookName,
          bookDescription,
          bookAuthor,
          bookCategory,
          bookLanguage,
          bookFile: bookFileUrl,
          postedBy: req.user.id
        });
        console.log("New book created:", newBook);
        return newBook;
      } catch (error) {
        console.error("Error adding book:", error.message);
        throw new Error("Failed to add book. Please try again.");
      }
    },

    


    // The following mutations (updateBook, deleteBook, updateUser, deleteUser) would follow a similar pattern:
    updateBook: async (_, args, { req }) => {
      if (!req || !req.user) {
        throw new AuthenticationError('Not authenticated');
      }
      try {
        const { updatebook } = args;
        const { bookCover, bookName, bookDescription, bookAuthor, bookCategory, bookLanguage, bookFile } = updatebook;
        const existingBook = await Book.findOne({ where: { id: args.id } });
        if (!existingBook) {
          throw new Error('Book not found');
        }
        const bookCoverUrl = bookCover ? await uploadToCloudinary(bookCover) : existingBook.bookCover;
        const bookFileUrl = bookFile ? await uploadToCloudinary(bookFile) : existingBook.bookFile;
        const [updateCount] = await Book.update(
          {
            bookCover: bookCoverUrl || existingBook.bookCover,
            bookName: bookName || existingBook.bookName,
            bookDescription: bookDescription || existingBook.bookDescription,
            bookAuthor: bookAuthor || existingBook.bookAuthor,
            bookCategory: bookCategory || existingBook.bookCategory,
            bookLanguage: bookLanguage || existingBook.bookLanguage,
            bookFile: bookFileUrl || existingBook.bookFile
          },
          { where: { id: args.id } }
        );
        if (updateCount === 0) {
          throw new Error('No changes detected');
        }
        return { success: true, message: 'Book info updated successfully' };
      } catch (error) {
        console.error('Error updating book:', error.message);
        return { success: false, message: `Error updating book: ${error.message}` };
      }
    },

    deleteBook: async (_, { id }, { req }) => {
      if (!req?.user) {
        throw new AuthenticationError('Not authenticated');
      }
      
      const book = await Book.findByPk(id);
      if (!book) throw new Error('Book not found.');
    
      // Delete associated Cloudinary files concurrently
      const deletionTasks = [];
      if (book.bookCover) {
        console.log(`Deleting book cover: ${book.bookCover}`);
        deletionTasks.push(
          deleteFileFromCloudinary(book.bookCover)
            .then(() => console.log('Book cover deleted from Cloudinary.'))
            .catch((error) => console.error('Failed to delete book cover:', error.message))
        );
      }
      if (book.bookFile) {
        console.log(`Deleting book file: ${book.bookFile}`);
        deletionTasks.push(
          deleteFileFromCloudinary(book.bookFile)
            .then(() => console.log('Book file deleted from Cloudinary.'))
            .catch((error) => console.error('Failed to delete book file:', error.message))
        );
      }
      
      // Wait for all deletion tasks to finish (errors are logged but do not block deletion)
      await Promise.all(deletionTasks);
    
      // Delete the book record from the database
      const deleteCount = await Book.destroy({ where: { id } });
      if (deleteCount === 0) throw new Error('Failed to delete book from the database.');
      
      return { success: true, message: 'Book and associated files deleted successfully.' };
    },
    

    // Public mutations: signup and login do not require authentication
    signup: async (_, args) => {
      try {
        const { username, phoneNumber, email, password } = args.signupuser;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await User.create({
          username,
          phoneNumber,
          email,
          password: hashedPassword
        });
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    login: async (_, { loginuser }) => {
      const { username, password } = loginuser;
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          throw new Error('Incorrect username or password');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new Error('Incorrect username or password');
        }
        const token = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.SECRET_STRING,
          { expiresIn: '5h' }
        );
        return { role: user.role, userId: user.id, token };
      } catch (error) {
        console.error('Error logging in:', error.message);
        throw new Error('Login unsuccessful. Please try again.');
      }
    },

    updateUser: async (_, args, { req }) => {
      if (!req || !req.user) {
        throw new AuthenticationError('Not authenticated');
      }
      try {
        const existingUser = await User.findOne({ where: { id: args.id } });
        if (!existingUser) {
          throw new Error("User not found");
        }
        const { updateuser } = args;
        const { profilePic, fullName, username, phoneNumber, email } = updateuser;
        const profilePicUrl = profilePic ? await uploadToCloudinary(profilePic) : existingUser.profilePic;
        const [updateCount] = await User.update(
          {
            profilePic: profilePicUrl,
            fullName: fullName || existingUser.fullName,
            username: username || existingUser.username,
            phoneNumber: phoneNumber || existingUser.phoneNumber,
            email: email || existingUser.email,
          },
          { where: { id: args.id } }
        );
        if (updateCount === 0) {
          throw new Error('User not found or nothing to update');
        }
        return { success: true, message: 'User info updated successfully' };
      } catch (error) {
        return { success: false, message: `Error updating user: ${error.message}` };
      }
    },

    deleteUser: async (_, { id }, { req }) => {
      if (!req || !req.user) {
        throw new AuthenticationError('Not authenticated');
      }
      try {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User not found");
        const del = await User.destroy({ where: { id } });
        if (!del) throw new Error("Deletion not successful");
        return { success: true, message: "User info deleted successfully." };
      } catch (error) {
        return { success: false, message: `Error deleting user: ${error.message}` };
      }
    },
  },
};
