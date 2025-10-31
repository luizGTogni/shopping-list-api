import { Entity } from "#core/entities/entity.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";

export interface IShopperImageProps {
  shopperId: UniqueEntityID;
  imageId: UniqueEntityID;
}

export class ShopperImage extends Entity<IShopperImageProps> {
  get shopperId() {
    return this.props.shopperId;
  }

  get imageId() {
    return this.props.imageId;
  }

  static create(props: IShopperImageProps, id?: UniqueEntityID) {
    const shopperImage = new ShopperImage(props, id);
    return shopperImage;
  }
}
