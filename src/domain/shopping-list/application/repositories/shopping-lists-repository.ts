import { ShoppingList } from "#domain/shopping-list/enterprise/entities/shopping-list.js";

export interface IShoppingListsRepository {
  create(shoppingList: ShoppingList): Promise<void>;
}
