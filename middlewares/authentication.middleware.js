import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export default asyncHandler((req, res, next) => {

    const { ACCESS_TOKEN } = req.cookies;

    if (!ACCESS_TOKEN) {
        throw new ApiError(400, "Bad Request/Missing ACCESS_TOKEN cookie");
    }

    const tokenDecoded = jwt.verify(ACCESS_TOKEN, process.env.ACCESS_TOKEN_SECRET);

    if (!tokenDecoded) {
        throw new ApiError(401, "Unauthorized/Invalid ACCESS_TOKEN cookie");
    }

    req.user = tokenDecoded.userhandle;
    req.userId = tokenDecoded.id;
    next();
});