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
exports.TasksGateway = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const users_repository_1 = require("../../users/repository/users.repository");
const websocket_jwt_guard_1 = require("./websocket.jwt.guard");
let TasksGateway = class TasksGateway {
    jwtService;
    userRepo;
    constructor(jwtService, userRepo) {
        this.jwtService = jwtService;
        this.userRepo = userRepo;
    }
    server;
    async handleConnection(client) {
        const token = client.handshake.auth?.token;
        console.log("token", token);
        if (!token) {
            throw new websockets_1.WsException('Invalid credentials');
        }
        const payload = this.jwtService.verify(token);
        console.log("payload", payload);
        client.data.user = payload;
        const user = await this.userRepo.findById(payload.sub);
        if (!user)
            throw new common_1.NotFoundException("Unauthorised user");
        client.join(user.id);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handlePing(data, client) {
        console.log('Received:', data);
        return { event: 'pong', data: 'pong response' };
    }
    notifyTaskCreated(task) {
        this.server.to(task.authorId).emit('task.created', task);
    }
    notifyTaskUpdated(task) {
        this.server.to(task.authorId).emit('task.updated', task);
    }
    notifyTaskDeleted(taskId, authorId) {
        this.server.to(authorId).emit('task.deleted', { id: taskId });
    }
};
exports.TasksGateway = TasksGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TasksGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('ping'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], TasksGateway.prototype, "handlePing", null);
exports.TasksGateway = TasksGateway = __decorate([
    (0, common_1.UseGuards)(websocket_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_repository_1.UsersRepository])
], TasksGateway);
//# sourceMappingURL=tasks.gateway.js.map