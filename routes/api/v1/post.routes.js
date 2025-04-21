import { Router } from 'express';
import { postCreateController, postFindByIdController, postFindByUserIdController, postUpdateController, postDeleteController } from '../../../controllers/api/v1/post.controller.js';
import authenticationMiddleware from "../../../middlewares/authentication.middleware.js";

import asyncHandler from '../../../utils/asyncHandler.js';

import validator from "../../../middlewares/validator.middleware.js";
import createPostValidator from '../../../validators/post.validators.js/create.post.validator.js';
import findPostByIdValidator from '../../../validators/post.validators.js/find.post.by.id.validator.js';
import findPostByUserIdValidator from '../../../validators/post.validators.js/find.post.by.user.id.validator.js';
import postUpdateValidator from '../../../validators/post.validators.js/post.update.validator.js';
import postDeleteValidator from '../../../validators/post.validators.js/post.delete.validator.js';

const router = Router();

router.post("/create", createPostValidator(), validator, authenticationMiddleware, asyncHandler(postCreateController));
router.get("/find/", findPostByIdValidator(), validator, asyncHandler(postFindByIdController));
router.get("/find/user", findPostByUserIdValidator(), validator, asyncHandler(postFindByUserIdController));
router.put("/update/", postUpdateValidator(), validator, authenticationMiddleware, asyncHandler(postUpdateController));
router.delete("/delete/", postDeleteValidator(), validator, authenticationMiddleware, asyncHandler(postDeleteController));

export default router;