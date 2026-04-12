import { ConflictException } from "@nestjs/common";
export declare class CategoryExistsException extends ConflictException {
    constructor(title: string);
}
