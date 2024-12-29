import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';



const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  
});

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </ApolloProvider>,
)

