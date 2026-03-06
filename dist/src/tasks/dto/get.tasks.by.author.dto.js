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
exports.GetTasksByAuthorDTO = void 0;
const api_property_decorator_1 = require("@nestjs/swagger/dist/decorators/api-property.decorator");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const schema_1 = require("../../db/schema");
class GetTasksByAuthorDTO {
    limit;
    cursor;
    priority;
    categoryId;
    searchKey;
    status;
    startDate;
    endDate;
    sortBy;
    sortOrder;
}
exports.GetTasksByAuthorDTO = GetTasksByAuthorDTO;
__decorate([
    (0, api_property_decorator_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetTasksByAuthorDTO.prototype, "limit", void 0);
__decorate([
    (0, api_property_decorator_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetTasksByAuthorDTO.prototype, "cursor", void 0);
__decorate([
    (0, api_property_decorator_1.ApiPropertyOptional)({
        enum: schema_1.taskPriorityEnum.enumValues,
        enumName: "TaskPriority",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(schema_1.taskPriorityEnum.enumValues),
    __metadata("design:type", Object)
], GetTasksByAuthorDTO.prototype, "priority", void 0);
__decorate([
    (0, api_property_decorator_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetTasksByAuthorDTO.prototype, "categoryId", void 0);
__decorate([
    (0, api_property_decorator_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetTasksByAuthorDTO.prototype, "searchKey", void 0);
__decorate([
    (0, api_property_decorator_1.ApiPropertyOptional)({ enum: schema_1.taskStatusEnum, description: 'Filter by task status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(schema_1.taskStatusEnum.enumValues, { message: "Status should be among OPEN | IN_PROGRESS | COMPLETED" }),
    __metadata("design:type", Object)
], GetTasksByAuthorDTO.prototype, "status", void 0);
__decorate([
    (0, api_property_decorator_1.ApiProperty)({ required: false, type: String, description: 'Filter tasks created after this date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetTasksByAuthorDTO.prototype, "startDate", void 0);
__decorate([
    (0, api_property_decorator_1.ApiProperty)({ required: false, type: String, description: 'Filter tasks created before this date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetTasksByAuthorDTO.prototype, "endDate", void 0);
__decorate([
    (0, api_property_decorator_1.ApiProperty)({ required: false, enum: schema_1.SortByEnum, description: 'Field to sort by' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(schema_1.SortByEnum),
    __metadata("design:type", String)
], GetTasksByAuthorDTO.prototype, "sortBy", void 0);
__decorate([
    (0, api_property_decorator_1.ApiProperty)({ required: false, enum: schema_1.SortOrderEnum, description: 'Sort order: ASC or DESC' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(schema_1.SortOrderEnum),
    __metadata("design:type", String)
], GetTasksByAuthorDTO.prototype, "sortOrder", void 0);
//# sourceMappingURL=get.tasks.by.author.dto.js.map