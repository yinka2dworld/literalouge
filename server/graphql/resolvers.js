import Book from "../models/book.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { GraphQLUpload } from 'graphql-upload';
import { Op } from 'sequelize';   
import jwt from'jsonwebtoken';
import { applyTokenChecker, uploadToLocalStorage, uploadToCloudinary, deleteFileFromLocalStorage, deleteFileFromCloudinary, extractPublicId } from "../config/cloudinary.js";




export const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    books: async (_, { page = 1, perPage = 9 }) => {
      try {
          const offset = (page - 1) * perPage;
          const { rows: allBooks, count: totalBooks } = await Book.findAndCountAll({
              order: [['createdAt', 'DESC']],
              limit: perPage,
          offset: offset,
          });
          const lastPage = Math.ceil(totalBooks / perPage);
        const currentPage = page;
        const previousPage = currentPage-1;
        const nextPage = currentPage+1; 
          return {
              allBooks,
             currentPage,
              previousPage,
              nextPage,
              lastPage,
          };
      } catch (error) {
          console.error('Error fetching books:', error);
          throw new Error('Unable to fetch books at the moment');
      }
  },
  
    book: async (_, args) => {
      try {
        const data = await Book.findOne({ where: { id: args.id } });
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    users: (applyTokenChecker, async () => {
      try {
        const data = await User.findAll();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    }),

    user:(applyTokenChecker, async (_, args) => {
      try {
        const data = await User.findOne({ where: { id: args.id } });
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    }),

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
    }
  },

  Mutation: {

    addBook: (applyTokenChecker, async (_, { addbook }) => {
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
        if (!bookName || !bookDescription || !bookAuthor || !bookCategory || !bookLanguage) {
          throw new Error("All required fields (except files) must be provided.");
        }
        const bookCoverUrl = bookCover ? await uploadToCloudinary(bookCover) : null;
        const bookFileUrl = bookFile ? await uploadToLocalStorage(bookFile) : null;
        const newBook = await Book.create({
          bookCover: bookCoverUrl,
          bookName,
          bookDescription,
          bookAuthor,
          bookCategory,
          bookLanguage,
          bookFile: bookFileUrl,
          // postedBy:req.adminId
        });
        console.log(newBook)
      //   return newBook;
      } catch (error) {
        console.error("Error adding book:", error.message);
        throw new Error("Failed to add book. Please try again.");
      }
    }),
     

    // Update a book
    updateBook: (applyTokenChecker, async (_, args) => {
      try {
        const { bookCover, bookName, bookDescription, bookAuthor, bookCategory, bookLanguage, bookFile } = args.updatebook;
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
        const updatedBook = await Book.findOne({ where: { id: args.id } });
        return {success: true, message: `Boook info updated successfully` };
      } catch (error) {
        console.error('Error during deleteBook operation:', error.message);
        return {success: false, message: `Error deleting book: ${error.message}`};
      }
    }),
  
    
    deleteBook: (applyTokenChecker, async (_, { id }) => {
      try {
        const book = await Book.findByPk(id);
        if (!book) {
          throw new Error('Book not found.');
        }
     if (book.bookCover) {
    const coverPublicId = extractPublicId(book.bookCover);
    if (coverPublicId) {
      console.log(`Deleting book cover with public ID: ${coverPublicId}`);
      try {
        await deleteFileFromCloudinary(coverPublicId);
      } catch (error) {
        console.error(`Failed to delete book cover: ${error.message}`);
      }
    } else {
      console.warn('No valid public ID found for book cover.');
        }
      }
      
  if (book.bookFile) {
 console.log(`Deleting book file with public ID: ${book.bookFile}`);
      try {
        await deleteFileFrom(book.bookFile);
      } catch (error) {
        console.error(`Failed to delete book file: ${error.message}`);
      }
    
  }
        const deleteCount = await Book.destroy({ where: { id } });
        if (deleteCount === 0) {
          throw new Error('Failed to delete book from the database.');
        }
        return {
          success: true,
          message: 'Book and associated files deleted successfully.',
        };
      } catch (error) {
        console.error('Error during deleteBook operation:', error.message);
        return {
          success: false,
          message: `Error deleting book: ${error.message}`,
        };
      }
    }),
    
    

    // User signup
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
    
    login: async (_, args, context) => {
      const { req } = context;
      const { username, password } = args.loginuser;
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
         throw new Error('Incorrect username or password'); 
        }
        const passwordMatch = await bcrypt.compare(password, user.password);   
              if (!passwordMatch) {
               throw new Error('Incorrect username or password'); 
              }
              const token = jwt.sign({ userId: user.id, email:user.email }, process.env.SECRET_STRING, {expiresIn:'5h'})
              
            return { role: user.role, userId: user.id, token };
      } catch (error) {
        console.error("Error logging in:", error.message);
        throw new Error("Login unsuccessful. Please try again.");
      }
    },

  
    updateUser: ( applyTokenChecker, async (_, args) => {
      try {
        const existingUser =  User.findOne({where: {}})
        const { profilePic, fullName, username, phoneNumber, email } = args.updateuser;
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
        return { success: true, message: `User info updated successfully` };
      } catch (error) {
        return { success: false, message: `Error updating user: ${error.message}` };
      }
    }),


    deleteUser:(applyTokenChecker, async (_, { id }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User not found");
        const del = await User.destroy({ where: { id } });
        if (!del) throw new Error("Deletion not successful");
        return { success: true, message: "User info deleted successfully." };
      } catch (error) {
        return { success: false, message: `Error deleting user: ${error.message}` };
      }
    }),


  }
};
