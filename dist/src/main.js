"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const all_exception_filter_1 = require("./common/filters/all.exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const config_1 = require("@nestjs/config");
const document_builder_1 = require("@nestjs/swagger/dist/document-builder");
const swagger_module_1 = require("@nestjs/swagger/dist/swagger-module");
const all_response_validator_interceptor_1 = require("./common/interceptors/all.response.validator.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new document_builder_1.DocumentBuilder()
        .setTitle('TaskFlow')
        .setDescription('Task management application')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Task')
        .build();
    const options = {
        operationIdFactory: (controllerKey, methodKey) => methodKey
    };
    const documentFactory = () => swagger_module_1.SwaggerModule.createDocument(app, config);
    swagger_module_1.SwaggerModule.setup('api', app, documentFactory);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true,
        transform: true,
    }));
    const reflector = app.get(core_1.Reflector);
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new all_response_validator_interceptor_1.AllResponseTransformInterceptor(reflector));
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionsFilter());
    const configService = app.get(config_1.ConfigService);
    await app.listen(configService.get('env.port') || 3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map