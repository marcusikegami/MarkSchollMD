import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
    query posts($category: String) {
        posts(category: $category) {
            _id
            header
            body
            video
            category 
            createdAt
        }
    }
`;

export const QUERY_POST = gql`
    query post($_id: ID!) {
        post(_id: $_id) {
            _id
            header
            body
            video
            category
            createdAt
        }
    }
`;

export const QUERY_TESTIMONIALS = gql`
    query Query {
        testimonials {
          _id
          body
          name
          approval
        }
    }
`;
