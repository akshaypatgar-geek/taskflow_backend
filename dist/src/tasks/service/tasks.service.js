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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const categories_repository_1 = require("../../categories/repository/categories.repository");
const users_repository_1 = require("../../users/repository/users.repository");
const tasks_repository_1 = require("../repository/tasks.repository");
const tasks_gateway_1 = require("../websocket/tasks.gateway");
let TasksService = class TasksService {
    userRepo;
    categoryRepo;
    repository;
    gateway;
    constructor(userRepo, categoryRepo, repository, gateway) {
        this.userRepo = userRepo;
        this.categoryRepo = categoryRepo;
        this.repository = repository;
        this.gateway = gateway;
    }
    async createTask(dto, authorId) {
        const { categoryId } = dto;
        const user = await this.userRepo.findById(authorId);
        if (!user)
            throw new common_1.NotFoundException("User does not exist");
        if (categoryId) {
            const category = await this.categoryRepo.findById(categoryId);
            if (!category)
                throw new common_1.NotFoundException("Category not found");
        }
        const task = await this.repository.createTask(dto, authorId);
        this.gateway.notifyTaskCreated(task);
        return task;
    }
    async findById(id, authorId) {
        const user = await this.userRepo.findById(authorId);
        if (!user)
            throw new common_1.NotFoundException("User does not exist");
        const task = await this.repository.findById(id);
        if (!task)
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        if (task.authorId !== authorId) {
            throw new common_1.ForbiddenException("User not allowed to view task");
        }
        return task;
    }
    async findByAuthorId(authorId, priority, categoryId, cursor, limit = 10, searchKey, status, startDate, endDate, sortBy = 'date', sortOrder = 'desc') {
        const user = await this.userRepo.findById(authorId);
        if (!user)
            throw new common_1.NotFoundException("User does not exist");
        return await this.repository.findByAuthorId(authorId, priority, categoryId, cursor, limit, searchKey, status, startDate, endDate, sortBy, sortOrder);
    }
    async updateTask(id, authorId, status, priority, categoryId, title) {
        const user = await this.userRepo.findById(authorId);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const task = await this.repository.findById(id);
        if (!task) {
            throw new common_1.NotFoundException("Task not found");
        }
        if (task.authorId !== authorId) {
            throw new common_1.ForbiddenException("User not allowed to delete task");
        }
        if (categoryId) {
            const category = await this.categoryRepo.findById(categoryId);
            if (!category) {
                throw new common_1.NotFoundException("Category not found");
            }
        }
        const updatedTask = await this.repository.updateTask(id, status, priority, categoryId, title);
        this.gateway.notifyTaskUpdated(updatedTask);
        return updatedTask;
    }
    async deleteTask(id, authorId) {
        const user = await this.userRepo.findById(authorId);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const task = await this.repository.findById(id);
        if (!task) {
            throw new common_1.NotFoundException("Task not found");
        }
        if (task.authorId !== authorId) {
            throw new common_1.ForbiddenException("User not allowed to delete task");
        }
        const deleteId = await this.repository.deleteTask(id);
        this.gateway.notifyTaskDeleted(deleteId, authorId);
        return { id: deleteId };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        categories_repository_1.CategoriesRepository,
        tasks_repository_1.TasksRepository,
        tasks_gateway_1.TasksGateway])
], TasksService);
//# sourceMappingURL=tasks.service.js.map