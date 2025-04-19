import logger from "../utils/logger.js";
import morgan from "morgan";

const morganFormat = ":method \":url\" :status ~:response-time ms";

export default morgan(morganFormat, {
    stream: {
        write: (message) => {

            logger.info(message);
        },
    },
})