import { body } from "express-validator";

export default () => {

    return [
        body("firstName").optional().trim(),
        body("lastName").optional().trim(),
        body("userhandle").optional().trim(),
    ]
}