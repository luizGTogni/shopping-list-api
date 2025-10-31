import { Entity } from "#core/entities/entity.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";

export interface IImageProps {
  title: string;
  link: string;
}

export class Image extends Entity<IImageProps> {
  get title() {
    return this.props.title;
  }

  get link() {
    return this.props.link;
  }

  static create(props: IImageProps, id?: UniqueEntityID) {
    const image = new Image(props, id);
    return image;
  }
}
