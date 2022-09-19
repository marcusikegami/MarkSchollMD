import { gql } from "apollo-server-express";
const typeDefs = gql`

    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        enconding: String!
    }

    type Post {
        _id: ID
        header: String
        body: String
        video: String
        category: String
        createdAt: String
    }

    type Testimonial {
        _id: ID
        body: String!
        name: String!
        approval: Boolean
    }

    type Auth {
        token: ID!
    }

    type Query {
        post(_id: ID!): Post
        posts(category: String): [Post]
        testimonials: [Testimonial]
        approvedTestimonials: [Testimonial]
        otherFields: Boolean!
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addPost(header: String!, body: String!, video: String, category: String!): Post
        editPost(_id: ID!, header: String!, body: String!, video: String, category: String!): Post
        removePost(_id: ID): Post
        postTestimonial(body: String!, name: String!): Testimonial
        editTestimonial(_id: ID!, approval: Boolean!): Testimonial
        singleUpload(file: Upload!): File!
    }
`;

export default typeDefs;