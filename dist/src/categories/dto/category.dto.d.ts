import { categoryEnum } from "../../db/schema";
export declare class CategoryDTO {
    id: string;
    title: string;
    status: (typeof categoryEnum.enumValues)[number];
}
