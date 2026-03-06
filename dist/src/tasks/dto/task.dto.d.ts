import { taskPriorityEnum } from "src/db/schema";
export declare class TaskDTO {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    priority: (typeof taskPriorityEnum.enumValues)[number];
    categoryId: string | null;
}
