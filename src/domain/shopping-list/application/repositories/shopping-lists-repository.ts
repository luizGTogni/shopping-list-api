import { IPaginationParams } from "#core/repositories/pagination-params.js";
import { ShoppingList } from "#domain/shopping-list/enterprise/entities/shopping-list.js";

export interface IShoppingListsRepository {
  create(shoppingList: ShoppingList): Promise<void>;
  findManyByShopperId(shopperId: string, params: IPaginationParams): Promise<ShoppingList[]>;
}
