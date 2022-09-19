import { AuthenticationError } from 'apollo-server-express';
import Post from '../models/Post.js';
import Testimonial from '../models/Testimonial.js';
import signToken from '../utils/signToken.js';
import dotenv from'dotenv';
dotenv.config();
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { finished } from 'stream/promises';

const resolvers = {
    Upload: GraphQLUpload,

    Query: {
        post: async(parent, { _id }) => {
            return Post.findOne({ _id });
        },
        posts: async (parent, { category }) => {
            const params = category ? { category} : {};
            return Post.find(params);
        },
        testimonials: async () => {
            return Testimonial.find();
        },
        approvedTestimonials: async () => {
            return Testimonial.find({ approval: true}, function (err, docs) {
                if (err){
                    console.log(err);
                }
                else{
                    console.log("First function call : ", docs);
                }
            });
        },
    },

    Mutation: {
        login: async (parent, { username, password }) => {
            const admin = process.env.DB_USERNAME;
            const pass = process.env.DB_PASSWORD;

            if(admin != username || pass != password) {

                throw new AuthenticationError(`Incorrect credentials ${admin} ${username}`);
            }

            const token = signToken(admin);

            return { token };
        },
        singleUpload: async (parent, { file }, context) => {
            if (context.admin) {
                const { createReadStream, filename, mimetype, encoding } = await file;
                const stream = createReadStream();
                const out = require('fs').createWriteStream('local-file-output.txt');
                stream.pipe(out);
                await finished(out);

                return { filename, mimetype, encoding };
            }
        },
        addPost: async (parent, args, context) => {
            if (context.admin) {
                const post = await Post.create({...args});

                return post ;
            }
            throw new AuthenticationError('Not logged in!');
        },
        editPost: async (parent, args, context) => {
            if (context.admin) {
                return Post.findOneAndUpdate(
                    { _id: args._id},
                    { header: args.header, body: args.body, video: args.video, category: args.category },
                    { new: true }
                )
            }
            throw new AuthenticationError('Not logged in!');
        },
        removePost: async (parent, { _id }, context) => {
            if (context.admin) {
                const deletedThought = await Post.findOneAndDelete(
                    { _id: _id },
                    { new: true }
                );
                return deletedThought;
            }
            throw new AuthenticationError('Not logged in!');
        },
        postTestimonial: async (parent, args) => {
            try {
                const testimonial = await Testimonial.create({...args});
                return testimonial;
            } catch (err) {
                console.error(err);
            };
        },
        editTestimonial: async (parent, { _id, approval }, context) => {
            if (context.admin) {
                const testimonial = await Testimonial.findOneAndUpdate(
                    { _id: _id,},
                    { approval: approval},
                    { new: true }
                );
                return testimonial;
            }
            throw new AuthenticationError('Not logged in!');
        }
    }
};

export default resolvers;