import postModel from "../../models/post.model.js";
import mongoose from "mongoose";

const postCreate = async (data) => {

    const newPost = await postModel.create(data);
    return newPost;
}

const postFindById = async (id) => {

    const post = await postModel.findById(id);
    return post;
}

const postFindByUserId = async (userId) => {

    const posts = await postModel.aggregate([

        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            password: 0,
                            refreshToken: 0,
                            __v: 0
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                _id: 1,
                title: 1,
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                user: 1,
            }
        }
    ]);

    return posts;
}

const postUpdate = async (id, data) => {
    const updatedPost = await postModel.findByIdAndUpdate(id, data, { new: true });
    return updatedPost;
}

const postDelete = async (id) => {
    const deletedPost = await postModel.deleteOne({ _id: id });
    return deletedPost;
}

export default {
    postCreate,
    postFindById,
    postFindByUserId,
    postUpdate,
    postDelete,
}