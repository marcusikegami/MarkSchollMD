import { AuthenticationError } from 'apollo-server-express';
import Post from '../models/Post.js';
import Testimonial from '../models/Testimonial.js';
import File from '../models/File.js';
import signToken from '../utils/signToken.js';
import dotenv from'dotenv';
dotenv.config();
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { finished } from 'stream/promises';
import path from 'path';
import fs from 'fs';
import Pdf from '../models/Pdf.js';
const __dirname = path.resolve();

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
            return Testimonial.find({ approval: true });
        },
        uploads: async () => {
            return File.find();
        },
        ptpdfs: async () => {
            return Pdf.find({category: 'Info for Physical Therapists'});
        },
        pipdfs: async () => {
            return Pdf.find({category: 'Info for Patients'});
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
        addPdf: async (parent, {pdfname, url, category}, context) => {
            if(context.admin) {
                const pdf = await Pdf.create({ pdfname: pdfname, url: url, category: category })
                return pdf;
            }
            throw new AuthenticationError('Not logged in!');
        },
        removePdf: async (parent, { url }, context) => {
            if (context.admin) {
                const pdf = await Pdf.findOneAndDelete({ url: url }, { new: true })
                return pdf;
            }
            throw new AuthenticationError('Not logged in!');
        },
        singleUpload: async (parent, { file }, context) => {
            if (context.admin) {
                let { createReadStream, filename, mimetype, encoding } = await file;
                filename = filename.replace(/\s+/g, '');
                console.log(filename);
                const stream = createReadStream();
                console.log('directory name', __dirname);
                const pathName = path.join(__dirname, `../client/public/assets/${filename}`);
                // const pathName = path.join(__dirname, `./client/public/assets/${filename}`);
                await stream.pipe(fs.createWriteStream(pathName));
                const Upload = await File.create({filename: filename, url: pathName});
                return Upload;
            }
            throw new AuthenticationError('Not logged in!');
        },
        removeUpload: async (parent, { url }, context) => {
            if (context.admin) {
                // delete a file
                try {
                    console.log('url', url);
                    fs.unlinkSync(url);
                    const file = await File.findOneAndDelete({url: url}, function (err) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("Deleted File: ", url);
                        }
                    })
                    console.log('File is deleted.')
                    return file;
                } catch (error) {
                    console.log(error)
                }
            }
            throw new AuthenticationError('Not logged in!');
        },
        addPost: async (parent, args, context) => {
            if (context.admin) {
                // args.body = JSON.stringify(args.body);
                console.log(args);
                const post = await Post.create({...args});

                return post ;
            }
            throw new AuthenticationError('Not logged in!');
        },
        editPost: async (parent, args, context) => {
            console.log(args);
            if (context.admin) {
                return Post.findOneAndUpdate(
                    { _id: args._id},
                    { header: args.header, body: args.body, video: args.video, image: args.image, imagecaption: args.imagecaption, category: args.category },
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
        },
        removeTestimonial: async (parent, { _id}, context) => {
            if(context.admin) {
                const testimonial = await Testimonial.findOneAndDelete(
                    { _id: _id },
                    { new: true } 
                );
                return testimonial;
            }
            throw new AuthenticationError('Not logged in!');
        }
    }
};

export default resolvers;