import { query } from "express-validator"

export default () => {

    return [
        query("user").trim().notEmpty().withMessage("user id is required")
    ]
}