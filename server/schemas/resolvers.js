const { AuthenticationError } = require('apollo-server-express');
const { Post } = require('../models');
const { signToken } = require('../utils/auth');
require('dotenv').config();
const resolvers = {
    Query: {
        post: async(parent, { _id }) => {
            return Post.findOne({ _id });
        },
        posts: async (parent, { category }) => {
            const params = category ? { category} : {};
            return Post.find(params);
        }
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
        }

    }
};

module.exports = resolvers;