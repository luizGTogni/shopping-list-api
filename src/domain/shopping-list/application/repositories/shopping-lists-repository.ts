import { IPaginationParams } from "#core/repositories/pagination-params.js";
import { ShoppingList } from "#domain/shopping-list/enterprise/entities/shopping-list.js";

export interface IShoppingListsRepository {
  create(shoppingList: ShoppingList): Promise<void>;
  findById(id: string): Promise<ShoppingList | null>;
  findManyByShopperId(shopperId: string, params: IPaginationParams): Promise<ShoppingList[]>;
}
