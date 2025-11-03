import { IShoppersRepository } from "#domain/shopping-list/application/repositories/shoppers-repository.js";
import { Shopper } from "#domain/shopping-list/enterprise/entities/shopper.js";

export class InMemoryShoppersRepository implements IShoppersRepository {
  public items: Shopper[] = [];

  async findById(id: string): Promise<Shopper | null> {
    return this.items.find((item) => item.id.toString() === id) || null;
  }
}
