import { Entity } from "#core/entities/entity.js";
import type { UniqueEntityID } from "#core/entities/unique-entity-id.js";

export interface ICategoryProps {
  name: string;
  description: string;
  deletedAt?: Date;
}

export class Category extends Entity<ICategoryProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
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

  remove() {
    this.props.deletedAt = new Date();
  }

  static create(props: ICategoryProps, id?: UniqueEntityID) {
    const category = new Category(props, id);
    return category;
  }
}
