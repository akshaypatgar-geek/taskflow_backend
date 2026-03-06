"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistsException = void 0;
const common_1 = require("@nestjs/common");
class UserExistsException extends common_1.ConflictException {
    constructor(email) {
        super(`User with email ${email} already exists`);
    }
}
exports.UserExistsException = UserExistsException;
//# sourceMappingURL=user.exists.exception.js.map