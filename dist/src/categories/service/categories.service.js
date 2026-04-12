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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const category_exists_exception_1 = require("../exceptions/category.exists.exception");
const categories_repository_1 = require("../repository/categories.repository");
const users_repository_1 = require("../../users/repository/users.repository");
let CategoriesService = class CategoriesService {
    repository;
    userRepo;
    constructor(repository, userRepo) {
        this.repository = repository;
        this.userRepo = userRepo;
    }
    async create(userId, title) {
        const user = await this.userRepo.findById(userId);
        if (!user)
            throw new common_1.NotFoundException("User not present in system");
        const category = await this.repository.findByTitle(title);
        if (category)
            throw new category_exists_exception_1.CategoryExistsException(title);
        return await this.repository.create(title);
    }
    async getCategories(userId, cursor, limit = 10) {
        const user = await this.userRepo.findById(userId);
        if (!user)
            throw new common_1.NotFoundException("User not present in system");
        return await this.repository.getCategories(cursor, limit);
    }
    async getCategoryById(userId, id) {
        const user = await this.userRepo.findById(userId);
        if (!user)
            throw new common_1.NotFoundException("User not present in system");
        const category = await this.repository.findById(id);
        if (!category)
            throw new common_1.NotFoundException("Category doesnt exist");
        return category;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categories_repository_1.CategoriesRepository,
        users_repository_1.UsersRepository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map