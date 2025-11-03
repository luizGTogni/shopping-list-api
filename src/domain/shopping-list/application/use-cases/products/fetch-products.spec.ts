import { makeProduct } from "#test/factories/make-product.js";
import { InMemoryProductsRepository } from "#test/repositories/in-memory-products-repository.js";
import { FetchProductsUseCase } from "./fetch-products";

let productsRepository: InMemoryProductsRepository;
let sut: FetchProductsUseCase;

describe("Fetch Products", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new FetchProductsUseCase(productsRepository);
  });

  it("should be able to fetch all the products", async () => {
    productsRepository.create(makeProduct());
    productsRepository.create(makeProduct());
    productsRepository.create(makeProduct());

    const result = await sut.execute({
      page: 1,
    });

    expect(result.isSucceeded()).toBe(true);
    expect(productsRepository.items).toHaveLength(3);
    expect(result.value?.products).toHaveLength(3);
  });

  it("should be able to fetch paginated the products", async () => {
    for (let i = 1; i <= 22; i++) {
      productsRepository.create(makeProduct({ name: `Product ${i}` }));
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.isSucceeded()).toBe(true);
    expect(productsRepository.items).toHaveLength(22);
    expect(result.value?.products).toHaveLength(2);
  });
});
