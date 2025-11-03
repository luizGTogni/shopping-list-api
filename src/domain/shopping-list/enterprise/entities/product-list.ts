import { WatchedList } from "#core/entities/watched-list.js";
import { ProductShoppingList } from "./product-shopping-list";

export class ProductList extends WatchedList<ProductShoppingList> {
  compareItems(a: ProductShoppingList, b: ProductShoppingList): boolean {
    return a.productId.equals(b.productId) && a.shoppingListId.equals(b.shoppingListId);
  }
}
