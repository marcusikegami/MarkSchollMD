import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
    query posts($category: String) {
        posts(category: $category) {
            _id
            header
            body {
                header
                body
                image
                imagecaption
            }
            image
            imagecaption
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
            body {
                header
                body
                image
                imagecaption
            }
            image
            imagecaption
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

export const QUERY_APPROVED_TESTIMONIALS = gql`
    query ApprovedTestimonials {
        approvedTestimonials {
          _id
          body
          name
          approval
        }
    }
`;

export const QUERY_UPLOADS = gql`
    query Uploads {
        uploads {
          filename
          url
          createdAt
        }
    }
`;

export const QUERY_PT_PDFS = gql`
    query PtPdfs {
        ptpdfs {
            pdfname
            url
            category
            createdAt
        }
    }
`;

export const QUERY_PI_PDFS = gql`
    query PiPdfs {
        pipdfs {
          pdfname
          url
          category
          createdAt
        }
    }
`;
