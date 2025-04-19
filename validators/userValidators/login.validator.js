import { body } from "express-validator";

export default () => {
    return [
        body("userhandle").notEmpty().trim().withMessage("Userhandle is required"),
        body("password").notEmpty().trim().withMessage("Password is required"),
    ]
}