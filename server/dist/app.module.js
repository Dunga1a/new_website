"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const role_module_1 = require("./role/role.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const typeorm_2 = require("./utils/typeorm");
const contact_module_1 = require("./contact/contact.module");
const rely_module_1 = require("./rely/rely.module");
const posts_module_1 = require("./posts/posts.module");
const mail_module_1 = require("./mail/mail.module");
let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION')
    envFilePath = '.env.production';
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            role_module_1.RoleModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            contact_module_1.ContactModule,
            config_1.ConfigModule.forRoot({ envFilePath }),
            passport_1.PassportModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQL_DB_HOST,
                port: parseInt(process.env.MYSQL_DB_PORT),
                username: process.env.MYSQL_DB_USERNAME,
                password: process.env.MYSQL_DB_PASSWORD,
                database: process.env.MYSQL_DB_NAME,
                synchronize: true,
                entities: typeorm_2.default,
                logging: false,
            }),
            rely_module_1.RelyModule,
            posts_module_1.PostsModule,
            mail_module_1.MailModule,
        ],
        controllers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map