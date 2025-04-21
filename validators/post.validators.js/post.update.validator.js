import { body, query } from "express-validator";

export default () => {

    return [
        query("id").trim().notEmpty().withMessage("post id is required"),
        body("title").optional().trim(),
        body("content").optional().trim(),
    ]
}