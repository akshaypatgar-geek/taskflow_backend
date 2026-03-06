import { ConflictException } from '@nestjs/common';
export declare class UserExistsException extends ConflictException {
    constructor(email: string);
}
