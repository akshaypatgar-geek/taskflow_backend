import { ConflictException } from "@nestjs/common"

export class CategoryExistsException extends ConflictException{
    constructor(title: string) {
        super(`Category with name ${title} already exists`);
    }
}