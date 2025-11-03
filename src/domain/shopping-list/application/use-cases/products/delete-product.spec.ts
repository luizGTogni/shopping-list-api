import { makeProduct } from "#test/factories/make-product.js";
import { InMemoryProductsRepository } from "#test/repositories/in-memory-products-repository.js";
import { DeleteProductUseCase } from "./delete-product";

let productsRepository: InMemoryProductsRepository;
let sut: DeleteProductUseCase;

describe("Delete Product", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new DeleteProductUseCase(productsRepository);
  });

  it("should be able to delete a product", async () => {
    const productCreated = makeProduct();

    productsRepository.create(productCreated);

    const result = await sut.execute({
      productId: productCreated.id.toString(),
    });

    expect(result.isSucceeded()).toBe(true);
    expect(productsRepository.items).toHaveLength(1);
    expect(productsRepository.items[0].deletedAt).toEqual(expect.any(Date));
  });

  it("should not be able to delete a product that already deleted", async () => {
    const productCreated = makeProduct();
    productCreated.remove();
    productsRepository.create(productCreated);

    const result = await sut.execute({
      productId: productCreated.id.toString(),
    });

    expect(result.isFailed()).toBe(true);
    expect(productsRepository.items).toHaveLength(1);
    expect(productsRepository.items[0].deletedAt).toEqual(expect.any(Date));
  });
});
