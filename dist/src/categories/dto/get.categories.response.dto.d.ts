import { CategoryDTO } from "./category.dto";
export declare class getCategoriesResponseDTO {
    categories: CategoryDTO[];
    nextCursor?: string;
    hasNextPage: boolean;
}
