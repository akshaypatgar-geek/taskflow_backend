import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { createCategoryDTO } from '../dto/create.category.dto';
import { CategoriesService } from '../service/categories.service';
import { UsersService } from 'src/users/service/users.service';
import { CurrentUser } from 'src/decorators/current.user.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { createCategoryResponseDTO } from '../dto/create.category.response.dto';
import { getCategoriesResponseDTO } from '../dto/get.categories.response.dto';
import { GetCategoriesDTO } from '../dto/get.categories.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService : CategoriesService, private readonly userService : UsersService) {}

    @ApiBearerAuth()
    @ResponseDto(createCategoryResponseDTO)

    @ApiCreatedResponse({
        type: createCategoryResponseDTO
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized user"
    })
    @Post('create')
    async createCategory(
        @CurrentUser() user: any,
        @Body() createCategoryDTO : createCategoryDTO) {
        const {title} = createCategoryDTO;
        return this.categoriesService.create(user.id, title);
    }

    @ApiBearerAuth()
     @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'cursor', required: false, type: String })
    @ResponseDto(getCategoriesResponseDTO)
    @ApiOkResponse({type: getCategoriesResponseDTO})
    @ApiUnauthorizedResponse({description:"Unauthorized User"})
    @Get()
    async getCategories(
        @CurrentUser() user : any,
        @Query() query: GetCategoriesDTO
    ) {
        const {limit, cursor} = query;
        return this.categoriesService.getCategories(user.id, cursor, limit);
    }
}
