import { RawProduct, Product } from "../models/product.model";

/**
 * Adapts an array of raw products to a new structure.
 *
 * @param products - An array of raw products to be adapted.
 * @returns An array of adapted products with a new structure.
 */
export function productAdapter(products: RawProduct[]) {
  return products.map((product) => {
    return {
      positionId: product.positionId,
      productId: product.productId,
      quantity: product.quantity,
      distance: 0,
      position: {
        x: product.x,
        y: product.y,
        z: product.z,
      },
    };
  });
}
