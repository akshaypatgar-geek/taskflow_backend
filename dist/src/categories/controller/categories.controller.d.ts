import { createCategoryDTO } from '../dto/create.category.dto';
import { CategoriesService } from '../service/categories.service';
import { UsersService } from 'src/users/service/users.service';
import { GetCategoriesDTO } from '../dto/get.categories.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    private readonly userService;
    constructor(categoriesService: CategoriesService, userService: UsersService);
    createCategory(user: any, createCategoryDTO: createCategoryDTO): Promise<any>;
    getCategories(user: any, query: GetCategoriesDTO): Promise<any>;
}
