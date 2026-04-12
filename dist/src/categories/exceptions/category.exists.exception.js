"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryExistsException = void 0;
const common_1 = require("@nestjs/common");
class CategoryExistsException extends common_1.ConflictException {
    constructor(title) {
        super(`Category with name ${title} already exists`);
    }
}
exports.CategoryExistsException = CategoryExistsException;
//# sourceMappingURL=category.exists.exception.js.map