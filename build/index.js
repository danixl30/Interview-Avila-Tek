"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const app_1 = require("./core/server/app");
require("./database/connection/mongoose.connection");
async function bootstrap() {
    const app = await (0, app_1.createServer)();
    app.listen(3000);
    console.log('Server started');
}
bootstrap();
