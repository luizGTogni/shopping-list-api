import { Category } from "#domain/shopping-list/enterprise/entities/category.js";

export interface ICategoriesRepository {
  create(category: Category): Promise<void>;
}
