import mongoose from 'mongoose';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import path from 'path';
import {fileURLToPath} from 'url';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import authMiddleware from './utils/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const app = express();
app.use(graphqlUploadExpress());

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: false,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({ embed: true}),
        ],
        context: authMiddleware,
    });
    await server.start();
    server.applyMiddleware({ app });
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/documentation-creator',
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
  });