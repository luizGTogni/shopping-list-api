import { AggregateRoot } from "#core/entities/aggregate-root.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { UserImage } from "./user-image";

export interface IUserProps {
  name: string;
  email: string;
  profileImage: UserImage;
  role: "SHOPPER" | "ADMIN";
}

export class User extends AggregateRoot<IUserProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get profileImage() {
    return this.props.profileImage;
  }

  get role() {
    return this.props.role;
  }

  static create(props: IUserProps, id?: UniqueEntityID) {
    const shopper = new User(props, id);
    return shopper;
  }
}
