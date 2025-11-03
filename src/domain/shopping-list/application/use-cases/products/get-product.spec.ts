import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { ProductImage } from "#domain/shopping-list/enterprise/entities/product-image.js";
import { makeProduct } from "#test/factories/make-product.js";
import { InMemoryProductsRepository } from "#test/repositories/in-memory-products-repository.js";
import { GetProductUseCase } from "./get-product";

let productsRepository: InMemoryProductsRepository;
let sut: GetProductUseCase;

describe("Get Product", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new GetProductUseCase(productsRepository);
  });

  it("should be able to get a product", async () => {
    const productCreated = makeProduct();

    productCreated.image = ProductImage.create({
      imageId: new UniqueEntityID("1"),
      productId: productCreated.id,
    });

    productsRepository.create(productCreated);

    const result = await sut.execute({
      productId: productCreated.id.toString(),
    });

    if (result.isSucceeded()) {
      expect(result.value.product.name).toEqual(productCreated.name);
      expect(result.value.product.description).toEqual(productCreated.description);
      expect(result.value.product.image).toEqual(productCreated.image);
    }
  });
});
