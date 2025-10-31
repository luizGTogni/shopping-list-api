import { AggregateRoot } from "#core/entities/aggregate-root.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { Optional } from "#core/types/optional.js";
import { ProductList } from "./product-list";

export interface IShoppingList {
  title: string;
  products: ProductList[];
  doneAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export class ShoppingList extends AggregateRoot<IShoppingList> {
  get title() {
    return this.props.title;
  }

  get products() {
    return this.props.products;
  }

  get doneAt() {
    return this.props.doneAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private _touch() {
    this.props.updatedAt = new Date();
  }

  done() {
    this.props.doneAt = new Date();
  }

  static create(props: Optional<IShoppingList, "createdAt">, id?: UniqueEntityID) {
    const shoppingList = new ShoppingList(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );
    return shoppingList;
  }
}
