import { NotFoundException } from "@nestjs/common";
export declare class TaskNotFoundException extends NotFoundException {
    constructor(id: string);
}
