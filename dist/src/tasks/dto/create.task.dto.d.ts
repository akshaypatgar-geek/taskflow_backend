import { taskPriorityEnum } from 'src/db/schema';
export declare class CreateTaskDto {
    id: string;
    title: string;
    priority?: (typeof taskPriorityEnum.enumValues)[number];
    categoryId?: string;
}
