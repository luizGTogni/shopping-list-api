import { AggregateRoot } from "#core/entities/aggregate-root.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import type { Optional } from "#core/types/optional.js";
import { ProductImage } from "./product-image";

export interface IProductProps {
  name: string;
  description: string;
  image: ProductImage;
  deletedAt?: Date;
}

export class Product extends AggregateRoot<IProductProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get image() {
    return this.props.image;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set image(image: ProductImage) {
    this.props.image = image;
  }

  remove() {
    this.props.deletedAt = new Date();
  }

  static create(props: Optional<IProductProps, "image">, id?: UniqueEntityID) {
    const product = new Product({ ...props, image: props.image ?? ProductImage.create() }, id);
    return product;
  }
}
