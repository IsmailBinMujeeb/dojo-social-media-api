import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required in post model'],
    },

    content: {
        type: String,
        required: [true, 'Content is required in post model'],
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required in post model'],
    },

}, { timestamps: true });

export default mongoose.model('post', postSchema);