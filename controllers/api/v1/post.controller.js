import postOperations from '../../../services/crud.services.js/post.crud.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';

export const postCreateController = async (req, res) => {

    const newPost = await postOperations.postCreate({ ...req.body, userId: req.userId });

    if (!newPost) {
        throw new ApiError(400, "Post creation failed");
    }

    return res.status(201).json(ApiResponse.PostResponse(201, "Post created", newPost));
}

export const postFindByIdController = async (req, res) => {

    const post = await postOperations.postFindById(req.query.id);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    return res.status(200).json(ApiResponse.PostResponse(200, "Post found", post));
}

export const postFindByUserIdController = async (req, res) => {

    const posts = await postOperations.postFindByUserId(req.query.user);

    if (!posts) {
        throw new ApiError(404, "Posts not found");
    }

    return res.status(200).json(ApiResponse.PostResponse(200, "Posts found", posts));
}

export const postUpdateController = async (req, res) => {

    const updatedPost = await postOperations.postUpdate(req.query.id, req.body);

    if (!updatedPost) {
        throw new ApiError(400, "Post update failed");
    }

    return res.status(200).json(ApiResponse.PostResponse(200, "Post updated", updatedPost));
}

export const postDeleteController = async (req, res) => {

    const deletedPost = await postOperations.postDelete(req.query.id);

    if (!deletedPost) {
        throw new ApiError(400, "Post deletion failed");
    }

    return res.status(200).json(ApiResponse.PostResponse(200, "Post deleted", deletedPost));
}