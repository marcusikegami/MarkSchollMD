import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
        token
        }
    }
`;

export const ADD_POST = gql`
    mutation AddPost($header: String!, $body: String!, $category: String!, $image: String, $imagecaption: String, $video: String) {
        addPost(header: $header, body: $body, category: $category, image: $image, imagecaption: $imagecaption, video: $video) {
          _id
          header
          body
          image
          imagecaption
          video
          category
        }
    }
`;

export const EDIT_POST = gql`
    mutation EditPost($_id: ID! $header: String!, $body: String!, $category: String!, $image: String, $imagecaption: String, $video: String) {
        editPost(_id: $_id header: $header, body: $body, category: $category, image: $image, imagecaption: $imagecaption, video: $video) {
          _id
          header
          body
          image
          imagecaption
          video
          category
        }
    }
`;

export const REMOVE_POST = gql`
    mutation RemovePost($_id: ID) {
        removePost(_id: $_id) {
          _id
          header
          body
          image
          imagecaption
          video
          category
        }
    }
`;

export const POST_TESTIMONIAL = gql`
    mutation postTestimonial($body: String!, $name: String!) {
        postTestimonial(body: $body, name: $name) {
          _id
          body
          name
        }
    }
`;

export const EDIT_TESTIMONIAL = gql `
    mutation EditTestimonial($_id: ID!, $approval: Boolean!) {
        editTestimonial(_id: $_id, approval: $approval) {
          _id
          body
          name
          approval
        }
    }
`;

export const REMOVE_TESTIMONIAL = gql `
    mutation RemoveTestimonial($_id: ID!) {
        removeTestimonial(_id: $_id) {
          _id
          body
          name
          approval
        }
    }
`;