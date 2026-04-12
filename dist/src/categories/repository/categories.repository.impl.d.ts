import { CategoriesRepository } from '../repository/categories.repository';
import { getCategoriesResponseDTO } from '../dto/get.categories.response.dto';
export declare class CategoriesRepositoryImpl implements CategoriesRepository {
    create(title: string): Promise<{
        id: string;
        status: "ACTIVE" | "INACTIVE" | null;
        title: string;
    }>;
    findById(id: string): Promise<{
        id: string;
        title: string;
        status: "ACTIVE" | "INACTIVE" | null;
    }>;
    findByTitle(title: string): Promise<{
        id: string;
        title: string;
        status: "ACTIVE" | "INACTIVE" | null;
    }>;
    getCategories(cursor?: string, limit?: number): Promise<getCategoriesResponseDTO>;
}
