import { Solution, Position } from "../models/solution.model";
import { Product } from "../models/product.model";
import { findNearestProduct, getDistance, getPickingOrder, updateProducts } from "../utils/solution.utils";

/**
 * Recursively generates a path to collect products based on the nearest available products.
 *
 * @param position - The current position in the warehouse.
 * @param productsIdsToCollect - An array of product IDs to be collected.
 * @param availableProducts - An array of available products in the warehouse.
 * @param collectedProducts - An array of products that have been collected on the path.
 * @returns An array of collected products in the order of collection.
 */
function generatePath(position: Position, productsIdsToCollect: string[], availableProducts: Product[], coleclectedProduct: Product[]) {
  if (productsIdsToCollect.length !== 0) {
    // 1. selection
    let nearestProduct = findNearestProduct(position, availableProducts);
    availableProducts = updateProducts(availableProducts, nearestProduct);

    // 2. insertion
    coleclectedProduct.push(nearestProduct);
    productsIdsToCollect.splice(productsIdsToCollect.indexOf(nearestProduct.productId), 1);

    // 3. back to 1.
    generatePath(nearestProduct.position, productsIdsToCollect, availableProducts, coleclectedProduct);
  }
  return coleclectedProduct;
}

/**
 * Finds a solution for optimizing the order of collecting products based on a starting position.
 *
 * @param products - An array of available products in the warehouse.
 * @param productIds - An array of product IDs to be collected.
 * @param startPosition - The starting position in the warehouse.
 * @returns A solution object containing the picking order and total distance.
 */
export function findSolution(products: Product[], productIds: string[], startPosition: Position): Solution {
  const path = generatePath(startPosition, productIds, products, []);

  return {
    pickingOrder: getPickingOrder(path),
    distance: getDistance(path),
  };
}
