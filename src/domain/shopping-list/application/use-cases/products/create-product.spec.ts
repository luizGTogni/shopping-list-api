import { ProductImage } from "#domain/shopping-list/enterprise/entities/product-image.js";
import { InMemoryProductsRepository } from "#test/repositories/in-memory-products-repository.js";
import { CreateProductUseCase } from "./create-product";

let productsRepository: InMemoryProductsRepository;
let sut: CreateProductUseCase;

describe("Create Product", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new CreateProductUseCase(productsRepository);
  });

  it("should be able to create a product", async () => {
    const resultExpected = {
      name: "Product Example",
      description: "Description Example",
    };

    const result = await sut.execute({
      name: resultExpected.name,
      description: resultExpected.description,
      imageId: "1",
    });

    expect(result.isSucceeded()).toBe(true);
    expect(productsRepository.items).toHaveLength(1);
    expect(result.value?.product.name).toEqual(resultExpected.name);
    expect(result.value?.product.description).toEqual(resultExpected.description);
    expect(result.value?.product.image).instanceOf(ProductImage);
  });
});
