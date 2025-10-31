import { Entity } from "#core/entities/entity.js";
import type { UniqueEntityID } from "#core/entities/unique-entity-id.js";

export interface IShopperProps {
  name: string;
  email: string;
}

export class Shopper extends Entity<IShopperProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  static create(props: IShopperProps, id?: UniqueEntityID) {
    const shopper = new Shopper(props, id);
    return shopper;
  }
}
