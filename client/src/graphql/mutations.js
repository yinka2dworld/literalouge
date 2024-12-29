import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation Mutation($loginuser: loginUserInput!) {
  login(loginuser: $loginuser) {
    token
    userId
    role
  }
}
`; 

export const SIGNUP = gql`
  mutation Signup($signupuser: signupUserInput) {
    signup (signupuser: $signupuser) {
   username,
   phoneNumber,
   email
    }
  }
`;
 

export const ADDBOOK = gql`
mutation AddBook($addbook: addBookInput!) {
  addBook(addbook: $addbook) {
    bookCover
    bookName
    bookDescription
    bookAuthor
    bookCategory
    bookLanguage
    bookFile
  }
}
`;

export const DELETEBOOK = gql`
mutation DeleteBook($deleteBookId: ID!) {
  deleteBook(id: $deleteBookId) {
    success
    message
  }
}
`;

export const DELETEUSER = gql`
mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    success
    message
  }
}`;

export const UPDATEBOOK = gql`
mutation Mutation($updateBookId: ID!, $updatebook: updateBookInput!) {
  updateBook(id: $updateBookId, updatebook: $updatebook) {
    success
    message
  }
}
`;

export const UPDATEUSER = gql`
mutation Mutation($updateUserId: ID!, $updateuser: updateUserInput!) {
  updateUser(id: $updateUserId, updateuser: $updateuser) {
    success
    message
  }
}
`;

