export declare abstract class CategoriesRepository {
    abstract create(title: string): any;
    abstract findById(id: string): any;
    abstract findByTitle(title: string): any;
    abstract getCategories(cursor?: string, limit?: number): any;
}
