export abstract class CategoriesRepository {
  abstract create(title: string);

  abstract findById( id: string);

  abstract findByTitle( title: string);

  abstract getCategories(cursor?:string,limit?:number,);
}