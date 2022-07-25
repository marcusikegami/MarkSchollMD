const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Post {
        _id: ID
        header: String
        body: String
        video: String
        category: String
    }

    type Auth {
        token: ID!
        admin: String
    }

    type Query {
        post(_id: ID!): Post
        posts(category: String): [Post]
    }

    type Mutation {
        login(username: String!, password: String!):
        addPost(header: String!, body: String!, video: String, category: String!): Post
        editPost(_id: ID!, header: String!, body: String!, video: String, category: String!): Post
        removePost(_id: ID): Post
    }
`;

module.exports = typeDefs;