"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const { PORT } = process.env;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
    app.useGlobalPipes(new common_1.ValidationPipe());
    try {
        await app.listen(PORT, () => {
            console.log(`Running on Port ${PORT}`);
            console.log(`Running in ${process.env.ENVIRONMENT} mode: ${process.env.ENVIRONMENT_MESSAGE}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map