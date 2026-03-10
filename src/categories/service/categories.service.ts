import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryExistsException } from '../exceptions/category.exists.exception';
import { CategoriesRepository } from '../repository/categories.repository';
import { UsersRepository } from 'src/users/repository/users.repository';


@Injectable()
export class CategoriesService {
    constructor(private readonly repository: CategoriesRepository,
        private readonly userRepo: UsersRepository
    ) {}

    async create(userId: string,title: string) {
        const user = await this.userRepo.findById(userId);
        if(!user) throw new NotFoundException("User not present in system");
        const category = await this.repository.findByTitle(title);
        if(category) throw new CategoryExistsException(title);
        
        return await this.repository.create(title);
    }

    async getCategories(userId: string, cursor?:string, limit=10) {
        const user = await this.userRepo.findById(userId);
        if(!user) throw new NotFoundException("User not present in system");
        return await this.repository.getCategories(cursor, limit);
    }

    async getCategoryById(userId: string, id:string) {
        
        const user = await this.userRepo.findById(userId);
        if(!user) throw new NotFoundException("User not present in system");
        const category = await this.repository.findById(id);
        if(!category) throw new NotFoundException("Category doesnt exist");
        return category;
    }
}
