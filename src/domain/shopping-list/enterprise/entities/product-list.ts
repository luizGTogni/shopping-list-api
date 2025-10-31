import { WatchedList } from "#core/entities/watched-list.js";
import { Product } from "./product";

export class ProductList extends WatchedList<Product> {
  compareItems(a: Product, b: Product): boolean {
    return a.id.equals(b.id);
  }
}
