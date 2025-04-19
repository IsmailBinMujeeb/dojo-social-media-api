import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export default asyncHandler((req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

        throw new ApiError(422, "Unprocessable Entity/", extractedErrors);
    }

    next();
});