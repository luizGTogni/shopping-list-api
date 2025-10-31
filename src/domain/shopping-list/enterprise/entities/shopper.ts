import { Entity } from "#core/entities/entity.js";
import type { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { ShopperImage } from "./shopper-image";

export interface IShopperProps {
  name: string;
  email: string;
  profileImage: ShopperImage;
}

export class Shopper extends Entity<IShopperProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get profileImage() {
    return this.props.profileImage;
  }

  static create(props: IShopperProps, id?: UniqueEntityID) {
    const shopper = new Shopper(props, id);
    return shopper;
  }
}
