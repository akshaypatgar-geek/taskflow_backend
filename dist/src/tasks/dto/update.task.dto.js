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
exports.updateTaskDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const schema_1 = require("../../db/schema");
class updateTaskDTO {
    id;
    title;
    status;
    priority;
    categoryId;
}
exports.updateTaskDTO = updateTaskDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Task id" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], updateTaskDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50, { message: "Title can't be more than 50 characters" }),
    __metadata("design:type", String)
], updateTaskDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Task Status" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(schema_1.taskStatusEnum.enumValues, { message: "Status can only be OPEN | IN_PROGRESS | COMPLETED" }),
    __metadata("design:type", Object)
], updateTaskDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(schema_1.taskPriorityEnum.enumValues, { message: "Priority must be LOW, MEDIUM, or HIGH" }),
    __metadata("design:type", Object)
], updateTaskDTO.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], updateTaskDTO.prototype, "categoryId", void 0);
//# sourceMappingURL=update.task.dto.js.map