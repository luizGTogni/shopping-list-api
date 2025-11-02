import type { IPaginationParams } from "#core/repositories/pagination-params.js";
import { Category } from "#domain/shopping-list/enterprise/entities/category.js";

export interface ICategoriesRepository {
  create(category: Category): Promise<void>;
  findMany(params: IPaginationParams): Promise<Category[]>;
}
