import { Injectable, NotFoundException } from '@nestjs/common';
import { eq, ilike, and, lt, desc } from 'drizzle-orm';

import { db } from '../../db/db.module';
import { categoriesTable, userTable } from 'src/db/schema';
import { CategoryExistsException } from '../exceptions/category.exists.exception';
import { CategoriesRepository } from '../repository/categories.repository';
import { getCategoriesResponseDTO } from '../dto/get.categories.response.dto';
import { CategoryDTO } from '../dto/category.dto';

@Injectable()
export class CategoriesRepositoryImpl implements CategoriesRepository {

  async create(title: string) {
    return await db.transaction(async (trx) => {
      const [newCategory] = await trx
      .insert(categoriesTable)
      .values({ title })
      .returning();

    return newCategory;
    });
  }

  async findById( id: string) {
    const [category] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id));

    return category;
  }

  async findByTitle(title: string) {

    const [category] = await db
      .select()
      .from(categoriesTable)
      .where(ilike(categoriesTable.title, title));

    return category;
  }

  async getCategories(cursor?:string, limit=10):Promise<getCategoriesResponseDTO> {
    let parsedCursor: {  id: string } | undefined = undefined;
  if (cursor) {
    parsedCursor = JSON.parse(Buffer.from(cursor, 'base64').toString());
  }
    const categories= await db
      .select()
      .from(categoriesTable)
      .where(and(eq(categoriesTable.status, 'ACTIVE'),
    parsedCursor?lt(categoriesTable.id, parsedCursor.id):undefined))
    .orderBy(desc(categoriesTable.id))
    .limit(limit+1);

       const hasNextPage = categories.length > limit;
  const data = hasNextPage ? categories.slice(0, limit) : categories;

  const nextCursor =
    hasNextPage && data.length
      ? Buffer.from(
          JSON.stringify({
            id: data[data.length - 1].id,
          })
        ).toString('base64')
      : undefined;
      return {
        categories: data as CategoryDTO[],
        nextCursor,
        hasNextPage
      }
  }
}