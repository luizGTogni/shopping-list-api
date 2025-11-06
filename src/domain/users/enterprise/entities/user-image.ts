import { Entity } from "#core/entities/entity.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { Optional } from "#core/types/optional.js";

export interface IUserImageProps {
  userId: UniqueEntityID;
  imageId: UniqueEntityID;
}

export class UserImage extends Entity<IUserImageProps> {
  get userId() {
    return this.props.userId;
  }

  get imageId() {
    return this.props.imageId;
  }

  static create(props: Optional<IUserImageProps, "imageId" | "userId"> = {}, id?: UniqueEntityID) {
    const userImage = new UserImage(
      { ...props, imageId: new UniqueEntityID(), userId: new UniqueEntityID() },
      id,
    );
    return userImage;
  }
}
