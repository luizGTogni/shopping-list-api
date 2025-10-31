import { Entity } from "#core/entities/entity.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";

export interface IProductImageProps {
  productId: UniqueEntityID;
  imageId: UniqueEntityID;
}

export class ProductImage extends Entity<IProductImageProps> {
  get productId() {
    return this.props.productId;
  }

  get imageId() {
    return this.props.imageId;
  }

  static create(props: IProductImageProps, id?: UniqueEntityID) {
    const productImage = new ProductImage(props, id);
    return productImage;
  }
}
