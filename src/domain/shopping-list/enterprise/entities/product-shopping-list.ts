import { Entity } from "#core/entities/entity.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";

export interface IProductShoppingListProps {
  productId: UniqueEntityID;
  shoppingListId: UniqueEntityID;
  quantity: number;
}

export class ProductShoppingList extends Entity<IProductShoppingListProps> {
  get productId() {
    return this.props.productId;
  }

  get shoppingListId() {
    return this.props.shoppingListId;
  }

  get quantity() {
    return this.props.quantity;
  }

  static create(props: IProductShoppingListProps, id?: UniqueEntityID) {
    const product = new ProductShoppingList(props, id);
    return product;
  }
}
