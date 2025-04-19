import app from "./index.js";
import logger from "./utils/logger.js";
import conn from "./config/db.config.js";

;(
    async function(){
        await conn();
        app.listen(app.get("port"), () => logger.info(`Running on http://127.0.0.1:${app.get("port")}`));
    }
)();