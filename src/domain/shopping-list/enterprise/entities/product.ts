import { Entity } from "#core/entities/entity.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { ProductImage } from "./product-image";

export interface IProduct {
  name: string;
  description: string;
  quantity: number;
  image: ProductImage;
}

export class Product extends Entity<IProduct> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get quantity() {
    return this.props.quantity;
  }

  get image() {
    return this.props.image;
  }

  static create(props: IProduct, id?: UniqueEntityID) {
    const product = new Product(props, id);
    return product;
  }
}
