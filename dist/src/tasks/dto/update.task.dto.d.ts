import { taskPriorityEnum, taskStatusEnum } from "../../db/schema";
export declare class updateTaskDTO {
    id: string;
    title: string;
    status: (typeof taskStatusEnum.enumValues)[number];
    priority?: (typeof taskPriorityEnum.enumValues)[number];
    categoryId?: string;
}
