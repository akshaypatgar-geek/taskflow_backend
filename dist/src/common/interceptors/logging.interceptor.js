"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    logger = new common_1.Logger(LoggingInterceptor_1.name);
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, params, query } = request;
        const now = Date.now();
        this.logger.log(`Incoming Request -> ${method} ${url} | Params: ${JSON.stringify(params)} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)}`);
        return next.handle().pipe((0, rxjs_1.tap)((response) => {
            const delay = Date.now() - now;
            this.logger.log(`Outgoing Response -> ${method} ${url} | Status: ${context.switchToHttp().getResponse().statusCode} | Time: ${delay}ms | Response: ${JSON.stringify(response)}`);
        }), (0, rxjs_1.catchError)((error) => {
            const delay = Date.now() - now;
            const status = error instanceof common_1.HttpException
                ? error.getStatus()
                : 500;
            const message = error instanceof common_1.HttpException
                ? JSON.stringify(error.getResponse())
                : error.message;
            this.logger.error(`Error -> ${method} ${url} | Status: ${error?.status || 500} | ${delay}ms | Message: ${error.message}`, error.stack);
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map