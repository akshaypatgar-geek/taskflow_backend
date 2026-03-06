"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesResponseDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const category_dto_1 = require("./category.dto");
const class_transformer_1 = require("class-transformer");
class getCategoriesResponseDTO {
    categories;
    nextCursor;
    hasNextPage;
}
exports.getCategoriesResponseDTO = getCategoriesResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => category_dto_1.CategoryDTO, isArray: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => category_dto_1.CategoryDTO),
    __metadata("design:type", Array)
], getCategoriesResponseDTO.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cursor for next page', }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], getCategoriesResponseDTO.prototype, "nextCursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates if there are more results', default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], getCategoriesResponseDTO.prototype, "hasNextPage", void 0);
//# sourceMappingURL=get.categories.response.dto.js.map