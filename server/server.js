import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

dotenv.config();

const startServer = async () => {
  try {
    // Create an ApolloServer instance with a context that verifies the token (if provided)
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      cache: 'bounded',
      persistedQueries: false,
      context: ({ req }) => {
        // Extract token from headers (if provided)
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        if (token) {
          try {
            // Verify token and attach decoded user info to req
            const decodedToken = jwt.verify(token, process.env.SECRET_STRING);
            req.user = { id: decodedToken.userId, role: decodedToken.role };
          } catch (error) {
            // If token is invalid, leave req.user undefined.
            console.error('Token verification failed:', error.message);
          }
        }
        return { req };
      },
    });

    await server.start();

    const app = express();
    const port = process.env.PORT || 4000;

    // Enable CORS as early as possible
    app.use(cors({
      origin: process.env.VITE_CLIENT_URL, // e.g., http://localhost:3000
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      optionsSuccessStatus: 204,
    }));

    // Middleware for handling file uploads
    app.use(graphqlUploadExpress());

    // Middleware for handling JSON requests
    app.use(express.json());

    // Serve static files from the "books" folder
    app.use('/books', express.static('books'));

    // Apply the Apollo GraphQL server middleware to the Express app
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
