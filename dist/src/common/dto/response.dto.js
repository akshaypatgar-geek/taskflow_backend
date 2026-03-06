"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDto = exports.RESPONSE_DTO_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.RESPONSE_DTO_KEY = 'response_dto';
const ResponseDto = (dto) => (0, common_1.SetMetadata)(exports.RESPONSE_DTO_KEY, dto);
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map