import { SortByEnum, SortOrderEnum, taskPriorityEnum, taskStatusEnum } from "../../db/schema";
export declare class GetTasksByAuthorDTO {
    limit?: number;
    cursor?: string;
    priority: (typeof taskPriorityEnum.enumValues)[number];
    categoryId?: string;
    searchKey?: string;
    status?: (typeof taskStatusEnum.enumValues)[number];
    startDate?: string;
    endDate?: string;
    sortBy?: SortByEnum;
    sortOrder?: SortOrderEnum;
}
