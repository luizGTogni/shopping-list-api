import { Entity } from "#core/entities/entity.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import type { Optional } from "#core/types/optional.js";

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

  static create(
    props: Optional<IProductImageProps, "imageId" | "productId"> = {},
    id?: UniqueEntityID,
  ) {
    const productImage = new ProductImage(
      {
        ...props,
        imageId: props.imageId ?? new UniqueEntityID(),
        productId: props.productId ?? new UniqueEntityID(),
      },
      id,
    );
    return productImage;
  }
}
