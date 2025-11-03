import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { ProductImage } from "#domain/shopping-list/enterprise/entities/product-image.js";
import { makeProduct } from "#test/factories/make-product.js";
import { InMemoryProductsRepository } from "#test/repositories/in-memory-products-repository.js";
import { EditProductUseCase } from "./edit-product";

let productsRepository: InMemoryProductsRepository;
let sut: EditProductUseCase;

describe("Edit Product", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new EditProductUseCase(productsRepository);
  });

  it("should be able to edit a product", async () => {
    const resultExpected = {
      name: "Product Changed",
      description: "Description Changed",
    };

    const productCreated = makeProduct({
      image: ProductImage.create({ imageId: new UniqueEntityID("100") }),
    });

    productsRepository.create(productCreated);

    const result = await sut.execute({
      productId: productCreated.id.toString(),
      name: resultExpected.name,
      description: resultExpected.description,
      imageId: "2",
    });

    if (result.isSucceeded()) {
      expect(result.value.product.name).toEqual(resultExpected.name);
      expect(result.value.product.description).toEqual(resultExpected.description);
      expect(result.value.product.image.imageId.toString()).toEqual("2");
      expect(result.value.product.image.productId).toEqual(productCreated.id);
    }
  });
});
