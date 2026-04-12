import { CategoriesRepository } from '../repository/categories.repository';
import { UsersRepository } from "../../users/repository/users.repository";
export declare class CategoriesService {
    private readonly repository;
    private readonly userRepo;
    constructor(repository: CategoriesRepository, userRepo: UsersRepository);
    create(userId: string, title: string): Promise<any>;
    getCategories(userId: string, cursor?: string, limit?: number): Promise<any>;
    getCategoryById(userId: string, id: string): Promise<any>;
}
