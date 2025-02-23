import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import { seedAdmin } from './utils/seeder.js';

// Load environment variables from .env file
dotenv.config();


// Start the server asynchronously
const startServer = async () => {
  try {
    // Create an ApolloServer instance
    const server = new ApolloServer({
      typeDefs, 
      resolvers, 
      cache: 'bounded', 
      persistedQueries: false,
      context: ({ req, res }) => ({ req, res }), 
    });

    // Start the ApolloServer
    await server.start();

    // Create an Express app instance
    const app = express();
    const port = process.env.PORT; // Use environment variable or default to 4000

    // Middleware for handling file uploads
    app.use(graphqlUploadExpress());
    
    app.use('/books', express.static('books'));

    // await seedAdmin();

    // Middleware for handling JSON requests
    app.use(express.json());

    // Enable CORS
    app.use(cors());

    // Apply the Apollo GraphQL server middleware to the Express app
    server.applyMiddleware({ app, path: '/graphql' });

    // Start the server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}/graphql`);
    });
  } catch (error) {
    // Handle any errors during the server startup
    console.error('Error starting the server:', error);
  }
};

// Call the function to start the server
startServer();
