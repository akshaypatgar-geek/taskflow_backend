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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("../service/tasks.service");
const create_task_dto_1 = require("../dto/create.task.dto");
const get_tasks_by_author_dto_1 = require("../dto/get.tasks.by.author.dto");
const current_user_decorator_1 = require("../../decorators/current.user.decorator");
const swagger_1 = require("@nestjs/swagger");
const create_task_response_dto_1 = require("../dto/create.task.response.dto");
const response_dto_1 = require("../../common/dto/response.dto");
const get_tasks_by_author_response_dto_1 = require("../dto/get.tasks.by.author.response.dto");
const schema_1 = require("../../db/schema");
const update_task_dto_1 = require("../dto/update.task.dto");
const delete_task_response_dto_1 = require("../dto/delete.task.response.dto");
let TasksController = class TasksController {
    tasksService;
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async createTask(createTaskDto, user) {
        return this.tasksService.createTask(createTaskDto, user.id);
    }
    async getTasksByAuthor(user, query) {
        const { priority, categoryId, limit, cursor, searchKey, status, startDate, endDate, sortBy, sortOrder } = query;
        return this.tasksService.findByAuthorId(user.id, priority, categoryId, cursor, limit, searchKey, status, startDate, endDate, sortBy, sortOrder);
    }
    async getTaskById(id, user) {
        return this.tasksService.findById(id, user.id);
    }
    async updateTask(dto, user) {
        const { id, status, priority, categoryId, title } = dto;
        return await this.tasksService.updateTask(id, user.id, status, priority, categoryId, title);
    }
    async deleteTask(id, user) {
        return this.tasksService.deleteTask(id, user.id);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, response_dto_1.ResponseDto)(create_task_response_dto_1.TaskMutationResponseDto),
    (0, swagger_1.ApiCreatedResponse)({ type: create_task_response_dto_1.TaskMutationResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: "Unauthorized user"
    }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, response_dto_1.ResponseDto)(get_tasks_by_author_response_dto_1.GetTasksByAuthorResponseDTO),
    (0, swagger_1.ApiCreatedResponse)({ type: get_tasks_by_author_response_dto_1.GetTasksByAuthorResponseDTO }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'cursor', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'priority', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'categoryId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'searchKey', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: schema_1.taskStatusEnum.enumValues }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, enum: schema_1.SortByEnum }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', required: false, enum: schema_1.SortOrderEnum }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: "Unauthorized user"
    }),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_tasks_by_author_dto_1.GetTasksByAuthorDTO]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasksByAuthor", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, response_dto_1.ResponseDto)(create_task_response_dto_1.TaskMutationResponseDto),
    (0, swagger_1.ApiCreatedResponse)({ type: create_task_response_dto_1.TaskMutationResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: "Unauthorized user"
    }),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_task_dto_1.updateTaskDTO, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: "Unauthorized user"
    }),
    (0, response_dto_1.ResponseDto)(delete_task_response_dto_1.DeleteTaskResponseDTO),
    (0, swagger_1.ApiOkResponse)({ type: delete_task_response_dto_1.DeleteTaskResponseDTO, description: "Task deleted successfully" }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTask", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map