import { Product } from "../models/product.model";
import { InternalError, ExternalError } from "../utils/error.utils";
import { productAdapter } from "../utils/product.utils";
import fetch from "node-fetch";

/**
 * Asynchronously fetches product information based on the given product ID.
 *
 * @param productId - The unique identifier of the product to retrieve.
 * @returns The product information if the request is successful, or throws an error if there is a problem.
 * @throws ExternalError - Throws an error when an external API request fails.
 * @throws InternalError - Throws an error when there is an internal server error.
 */
async function findProduct(productId: string) {
  try {
    const product = await fetch(`https://dev.aux.boxpi.com/case-study/products/${productId}/positions`, {
      method: "GET",
      headers: {
        "x-api-key": "3232", //process.env.BOXPI_API_KEY as string,
      },
    });
    if (product.status == 200) {
      return productAdapter(await product.json());
    }
    throw new ExternalError(`External Error ${product.status}. While fetching the product from https://dev.aux.boxpi.com/`, product.status);
  } catch (error) {
    if (error instanceof ExternalError) {
      throw error;
    } else {
      throw new InternalError(`Internal Error 500. While fetching the products.`, 500);
    }
  }
}

/**
 * Asynchronously fetches information for multiple products based on an array of product IDs.
 *
 * @param productsId - An array of unique product identifiers to retrieve information for.
 * @returns An array of products' information if the requests are successful.
 * @throws Error - Throws an error if any of the individual product requests fail.
 */
export async function findProducts(productsId: string[]) {
  let products: Product[] = [];
  try {
    await Promise.all(
      productsId.map(async (productId) => {
        const product = await findProduct(productId);
        products = [...product, ...products];
      })
    );
  } catch (error) {
    throw error;
  }
  return products;
}
