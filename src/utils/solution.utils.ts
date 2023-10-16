import { Position, OrderToPick } from "../models/solution.model";
import { Product } from "../models/product.model";

/**
 * Calculates the Manhattan distance between two 3D positions.
 *
 * @param positionA - The first position.
 * @param positionB - The second position.
 * @returns The Manhattan distance between the two positions.
 */
function d(postionA: Position, positionB: Position) {
  const X = Math.abs(postionA.x - positionB.x);
  const Y = Math.abs(postionA.y - positionB.y);
  const Z = Math.abs(postionA.z - positionB.z);
  return X + Y + Z;
}

/**
 * Finds the nearest product to a given position from an array of available products.
 *
 * @param position - The target position.
 * @param availableProducts - An array of available products to search from.
 * @returns The nearest product to the target position based on distance.
 */
export function findNearestProduct(position: Position, availableProducts: Product[]) {
  availableProducts.map((product) => {
    product.distance = d(position, product.position);
    return product;
  });
  return availableProducts.reduce((nearestProduct, currentProduct) => {
    return nearestProduct.distance < currentProduct.distance ? nearestProduct : currentProduct;
  });
}

/**
 * Updates the list of available products by removing products with the nearest productId.
 *
 * @param availableProducts - An array of available products to be updated.
 * @param nearestProduct - The nearest productId to be removed.
 * @returns An updated array of available products with the nearest productId removed.
 */
export function updateProducts(availableProducts: Product[], nearestProduct: Product) {
  return availableProducts.filter((obj) => {
    if (obj.productId != nearestProduct.productId) {
      return obj;
    }
  });
}

/**
 * Creates a list of orders to pick from a given path of products.
 *
 * @param path - An array of products representing the path to follow.
 * @returns An array of orders to pick, each containing productId and positionId.
 */
export function getPickingOrder(path: Product[]) {
  return path.map((product) => {
    return {
      productId: product.productId,
      positionId: product.positionId,
    } as OrderToPick;
  });
}

/**
 * Calculates the total distance for a given path of products.
 *
 * @param path - An array of products representing the path to follow.
 * @returns The total distance for the path, which is the sum of distances between products.
 */
export function getDistance(path: Product[]) {
  return path.reduce((accumulator, product) => {
    return accumulator + product.distance;
  }, 0);
}
