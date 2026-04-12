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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../service/users.service");
const current_user_decorator_1 = require("../../decorators/current.user.decorator");
const create_user_dto_1 = require("../dto/create.user.dto");
const update_user_dto_1 = require("../dto/update.user.dto");
const multer_1 = require("@nestjs/platform-express/multer");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../dto/user.dto");
const file_upload_service_1 = require("../../common/file-upload/file-upload.service");
const response_dto_1 = require("../../common/dto/response.dto");
const public_decorator_1 = require("../../decorators/public.decorator");
let UsersController = class UsersController {
    usersService;
    fileUploadService;
    constructor(usersService, fileUploadService) {
        this.usersService = usersService;
        this.fileUploadService = fileUploadService;
    }
    async register(createUserDto) {
        const { email, password } = createUserDto;
        const user = await this.usersService.createUser(email, password);
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async getProfile(user) {
        return this.usersService.findById(user.id);
    }
    async updateUser(user, file, updateInfo) {
        const { name } = updateInfo;
        if (file) {
            console.log('File uploaded successfully:', file.originalname, file.size, file.mimetype);
        }
        else {
            console.log('No file uploaded');
        }
        return this.usersService.updateUser(user.id, name);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update current user profile' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, response_dto_1.ResponseDto)(user_dto_1.UserDto),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully', type: user_dto_1.UserDto }),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('profilePicture', file_upload_service_1.FileUploadService.memoryMulterOptions())),
    (0, common_1.Patch)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        file_upload_service_1.FileUploadService])
], UsersController);
//# sourceMappingURL=users.controller.js.map