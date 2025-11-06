import { AggregateRoot } from "#core/entities/aggregate-root.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { Optional } from "#core/types/optional.js";
import { UserImage } from "./user-image";
import { Password } from "./value-objects/password";

export interface IUserProps {
  name: string;
  email: string;
  password: Password;
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

  set profileImage(profileImage: UserImage) {
    this.props.profileImage = profileImage;
  }

  static create(props: Optional<IUserProps, "profileImage">, id?: UniqueEntityID) {
    const shopper = new User(
      { ...props, profileImage: props.profileImage ?? UserImage.create() },
      id,
    );
    return shopper;
  }
}
