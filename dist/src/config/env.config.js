"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
require("dotenv/config");
exports.default = (0, config_1.registerAs)('env', () => ({
    port: process.env.PORT || 3000,
    jwt: {
        secret: process.env.JWT_SECRET || 'defaultsecret',
    },
    database: {
        url: process.env.DATABASE_URL || '',
    },
}));
//# sourceMappingURL=env.config.js.map