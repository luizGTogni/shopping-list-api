import { Entity } from "#core/entities/entity.js";
import type { UniqueEntityID } from "#core/entities/unique-entity-id.js";

export interface ICategoryProps {
  name: string;
  description: string;
}

export class Category extends Entity<ICategoryProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  static create(props: ICategoryProps, id?: UniqueEntityID) {
    const category = new Category(props, id);
    return category;
  }
}
