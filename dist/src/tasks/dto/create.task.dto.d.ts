import { taskPriorityEnum } from 'src/db/schema';
export declare class CreateTaskDto {
    title: string;
    priority?: (typeof taskPriorityEnum.enumValues)[number];
    categoryId?: string;
}
