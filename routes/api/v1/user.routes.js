import { Router } from "express";
import { userRegisterController, userLoginController, userLogoutController, userProfileController, userUpdateController, userDeleteController } from "../../../controllers/api/v1/user.controller.js";
import asyncHandler from "../../../utils/asyncHandler.js";

// Importing middlewares
import authenticationMiddleware from "../../../middlewares/authentication.middleware.js";
import validatorMiddleware from "../../../middlewares/validator.middleware.js";
import upload from "../../../middlewares/multer.middleware.js";

// Importing user validation
import registerUserValidator from "../../../validators/userValidators/register.validator.js";
import loginUserValidator from "../../../validators/userValidators/login.validator.js";
import updateUserValidator from "../../../validators/userValidators/update.validator.js";

const router = Router();

router.post("/register", registerUserValidator(), validatorMiddleware, asyncHandler(userRegisterController));
router.post("/login", loginUserValidator(), validatorMiddleware, asyncHandler(userLoginController));
router.post("/logout", authenticationMiddleware, asyncHandler(userLogoutController));
router.get("/profile", authenticationMiddleware, asyncHandler(userProfileController));
router.put("/update", updateUserValidator(), validatorMiddleware, upload.single('profilePicture'), authenticationMiddleware, asyncHandler(userUpdateController));
router.delete("/delete", authenticationMiddleware, asyncHandler(userDeleteController));

export default router;