"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const tasks_controller_1 = require("./controller/tasks.controller");
const tasks_service_1 = require("./service/tasks.service");
const users_module_1 = require("../users/users.module");
const categories_module_1 = require("../categories/categories.module");
const tasks_repository_1 = require("./repository/tasks.repository");
const tasks_repository_impl_1 = require("./repository/tasks.repository.impl");
const tasks_gateway_1 = require("./websocket/tasks.gateway");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let TasksModule = class TasksModule {
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, categories_module_1.CategoriesModule,
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '15m' },
                }),
            }),
        ],
        controllers: [tasks_controller_1.TasksController],
        providers: [tasks_service_1.TasksService,
            tasks_gateway_1.TasksGateway, {
                provide: tasks_repository_1.TasksRepository,
                useClass: tasks_repository_impl_1.TasksRepositoryImpl
            },
        ]
    })
], TasksModule);
//# sourceMappingURL=tasks.module.js.map