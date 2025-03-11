import {  gql } from '@apollo/client';


export const SEARCHBOOK = gql`
query SearchBooks($searchTerm: String!) {
  searchBooks(searchTerm: $searchTerm) {
    id
    bookName
    bookAuthor
  }
}
`;


  export const BOOKS = gql`
  query Books($page: Int, $perPage: Int) {
  books(page: $page, perPage: $perPage) {
    allBooks {
    id,
    bookCover,
    bookName,
    bookAuthor
    bookLanguage
    }
    currentPage
    previousPage
    nextPage
    lastPage
  }
}
`;

 
export const BOOK = gql`
query Book($bookId: ID!) {
  book(id: $bookId) {
    id
    bookCover
    bookName
    bookDescription
    bookAuthor
    bookCategory
    bookLanguage
    bookFile
    createdAt
  }
}
`;



export const USERS = gql`
 query Users {
  users {
    id
    profilePic
    fullName
    username
    phoneNumber
    email
    password
  }
}
`;

export const USER = gql`
 query User($userId: ID!) {
  user(id: $userId) {
    id
    profilePic
    fullName
    username
    phoneNumber
    email
    password
  }
}
`;