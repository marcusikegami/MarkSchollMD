const { AuthenticationError } = require('apollo-server-express');
const { Post } = require('../models');
const { signToken } = require('../utils/auth');

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
            const admin = process.env.USERNAME;
            const pass = process.env.PASSWORD;

            if(admin != username || pass != password) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(admin);

            return { token, admin };
        },
        addPost: async (parent, args) => {
            const post = await Post.create({...args});

            return post ;
        },
        editPost: async (parent, args) => {
            return Post.findOneAndUpdate(
                { _id: args._id},
                { header: args.header, body: args.body, video: args.video, category: args.category },
                { new: true }
            )
        },
        removePost: async (parent, { _id }) => {
            const deletedThought = await Post.findOneAndDelete(
                { _id: _id },
                { new: true }
            );
            return deletedThought;
        }

    }
};

module.exports = resolvers;