import { gql } from "apollo-server-express";
const typeDefs = gql`

    scalar Upload

    type File {
        filename: String!
        url: String!
        createdAt: String
    }

    type Pdf {
        pdfname: String!
        url: String!
        category: String
        createdAt: String
    }

    input ParagraphInput {
        header: String!
        body: String!
        image: String
        imagecaption: String
    }
    
    type Paragraph {
        header: String!
        body: String!
        image: String
        imagecaption: String
    }

    type Post {
        _id: ID
        header: String
        video: String
        body: [Paragraph]
        image: String
        imagecaption: String
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
        uploads: [File]
        ptpdfs: [Pdf]
        pipdfs: [Pdf]
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addPost(header: String!, body: [ParagraphInput]!, image: String, imagecaption: String, video: String, category: String!): Post
        editPost(_id: ID!, header: String!, body: [ParagraphInput]!, image: String, imagecaption: String, video: String, category: String!): Post
        removePost(_id: ID): Post
        postTestimonial(body: String!, name: String!): Testimonial
        editTestimonial(_id: ID!, approval: Boolean!): Testimonial
        removeTestimonial(_id: ID!): Testimonial

        addPdf(pdfname: String! url: String! category: String!): Pdf
        removePdf(url: String!): Pdf

        singleUpload(file: Upload!): File!
        removeUpload(url: String!): File
    }
`;

export default typeDefs;