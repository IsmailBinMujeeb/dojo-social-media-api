import { body } from "express-validator"

export default () => {

    return [
        body("title").trim().notEmpty().withMessage("Title is required"),
        body("content").trim().notEmpty().withMessage("Content is required")
    ]
}