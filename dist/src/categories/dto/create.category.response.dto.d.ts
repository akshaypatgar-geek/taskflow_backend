import { categoryEnum } from "../../db/schema";
export declare class createCategoryResponseDTO {
    title: string;
    status?: (typeof categoryEnum.enumValues)[number];
}
