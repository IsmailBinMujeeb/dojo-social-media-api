import { body } from "express-validator"

export default () => {
    return [
        body("firstName").notEmpty().trim().withMessage("First name is required"),
        body("lastName").optional().trim(),
        body("userhandle").notEmpty().trim().withMessage("Userhandle is required"),
        body("email").notEmpty().trim().withMessage("Email is required").isEmail().withMessage("Email is invalid"),
        body("password").notEmpty().trim().withMessage("password is required")
    ]
}