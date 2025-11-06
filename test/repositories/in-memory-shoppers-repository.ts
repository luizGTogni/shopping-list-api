import { IUsersRepository } from "#domain/users/application/repositories/users-repository.js";
import type { Shopper } from "#domain/users/enterprise/entities/shopper.js";

export class InMemoryShoppersRepository implements IUsersRepository {
  public items: Shopper[] = [];

  async findById(id: string): Promise<Shopper | null> {
    return this.items.find((item) => item.id.toString() === id) || null;
  }
}
