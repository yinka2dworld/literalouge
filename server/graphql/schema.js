
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Upload
  scalar Date

  type Book {
    id: ID!
    bookCover: String
    bookName: String!
    bookDescription: String!
    bookAuthor: String!
    bookCategory: String!
    bookLanguage: String!
    bookFile: String
    createdAt: Date
  }


  type User {
    id: ID!
    profilePhoto: String
    fullName: String
    username: String!
    phoneNumber: String
    email: String!
    country: String
    password: String!
    role: String!
    activityStatus: String!
  }

  type PaginatedBooks {
    allBooks: [Book!]!
    currentPage: Int!,
    previousPage: Int!,
    nextPage: Int!,
    lastPage: Int!,
  }

  input addBookInput {
    bookCover: Upload
    bookName: String!
    bookDescription: String!
    bookAuthor: String!
    bookCategory: String!
    bookLanguage: String!
    bookFile: Upload
  }

  input updateBookInput {
    bookCover: Upload
    bookName: String!
    bookDescription: String!
    bookAuthor: String!
    bookCategory: String!
    bookLanguage: String!
    bookFile: Upload
  }

  input updateUserInput {
    profilePhoto: String
    fullName: String
    username: String!
    phoneNumber: String!
    email: String!
    country: String
  }

  type DeleteResponse {
  success: Boolean!
  message: String
}

type UpdateResponse {
  success: Boolean!
  message: String
}


  type LoginResponse {
  token: String!
  userId: String!
  role: String!
}
  input loginUserInput {
    username: String!
    password: String!
  }

  input signupUserInput {
    username: String!
    phoneNumber: String!
    email: String!
    password: String!
  }

  type Query {
    books(page: Int, perPage: Int): PaginatedBooks!
    book(id: ID!): Book
    users: [User]
    user(id: ID!): User
    searchBooks(searchTerm: String!): [Book]
  }

  type Mutation {
    addBook(addbook: addBookInput!): Book
    updateBook(id: ID!, updatebook: updateBookInput!): UpdateResponse
    login(loginuser: loginUserInput!):LoginResponse
    signup(signupuser: signupUserInput): User
    deleteBook(id: ID!): DeleteResponse
    deleteUser(id: ID!): DeleteResponse
    updateUser(id: ID!, updateuser: updateUserInput!): UpdateResponse
  }
`;
