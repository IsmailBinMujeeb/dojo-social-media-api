import userOperations from "../../../services/crud.services.js/user.crud.js";
import ApiError from "../../../utils/ApiError.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import authTokensGenerator from "../../../utils/authTokensGenerator.js";
import uploadOnCloudinary from "../../../utils/cloudinary.js";

export const userRegisterController = async (req, res) => {

    const newUser = await userOperations.userCreate(req.body);

    if (!newUser) {
        throw new ApiError(400, "user registration failed");
    }

    const authTokens = authTokensGenerator({ _id: newUser._id, userhandle: newUser.userhandle });

    res.cookie("ACCESS_TOKEN", authTokens.ACCESS_TOKEN, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 15 // 15 minutes
    });

    res.cookie("REFRESH_TOKEN", authTokens.REFRESH_TOKEN, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    newUser.refreshToken = authTokens.REFRESH_TOKEN;
    await newUser.save();

    return res.status(201).json(new ApiResponse(201, "User created", newUser));
}

export const userLoginController = async (req, res) => {

    const user = await userOperations.userFindByUserhandle(req.body.userhandle);

    const authTokens = authTokensGenerator({ _id: user._id, userhandle: user.userhandle });

    res.cookie("ACCESS_TOKEN", authTokens.ACCESS_TOKEN, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 15 // 15 minutes
    });

    return res.status(200).json(new ApiResponse(200, "User logged in", user));
}

export const userLogoutController = async (req, res) => {
    const user = await userOperations.userFindByUserhandle(req.user);

    if (!user) {
        throw new ApiError(400, "Bad Request/Invalid userhandle");
    }

    res.clearCookie("ACCESS_TOKEN", {
        httpOnly: true,
        secure: true
    });

    return res.status(200).json(new ApiResponse(200, "User logged out", user));
}

export const userProfileController = async (req, res) => {
    const user = await userOperations.userFindByUserhandle(req.user);

    if (!user) {
        throw new ApiError(400, "Bad Request/Invalid userhandle");
    }

    return res.status(200).json(new ApiResponse(200, "User profile", user));
}

export const userUpdateController = async (req, res) => {
    const user = await userOperations.userFindByUserhandle(req.user);

    if (!user) {
        throw new ApiError(400, "Bad Request/Invalid userhandle");
    }

    let updatedUser;

    if (req.file) {
        const profilePicture = await uploadOnCloudinary(req.file.path);

        updatedUser = await userOperations.userUpdate(user._id, { ...req.body, profilePicture });
    } else {
        updatedUser = await userOperations.userUpdate(user._id, req.body);
    }

    return res.status(200).json(new ApiResponse(200, "User updated", updatedUser));
}

export const userDeleteController = async (req, res) => {
    const user = await userOperations.userFindByUserhandle(req.user);
    
    if (!user) {
        throw new ApiError(400, "Bad Request/Invalid userhandle");
    }

    await userOperations.userDelete(user._id);

    return res.status(200).json(new ApiResponse(200, "User deleted", user));
}