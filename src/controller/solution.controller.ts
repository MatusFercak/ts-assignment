import { Request, Response } from "express";
import { Product, RequestBody } from "../models/product.model";
import { Solution } from "../models/solution.model";
import { findProducts } from "../service/product.service";
import { findSolution } from "../service/solution.service";
import { throwIfMissing, throwIfIlegalTypeInArray, throwIfIlegalTypeInObject, handleError } from "../utils/error.utils";

/**
 * Handles the HTTP request to find a solution for optimizing product collection.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the solution if successful, or an error response if there are issues.
 */
export async function getSolutionHandler(req: Request, res: Response) {
  try {
    // Validate the request data
    throwIfMissing(req.body, ["products", "startingPosition"], "BadRequest");
    throwIfMissing(req.body.startingPosition, ["x", "y", "z"], "BadRequest missing startingPosition");
    throwIfMissing(process.env, ["BOXPI_API_KEY"], "ApiKey missing");

    throwIfIlegalTypeInArray(req.body.products, "string", "IlegalType in Array must be String");
    throwIfIlegalTypeInObject(req.body.startingPosition, ["x", "y", "z"], "number", "IlegalType for properties in Object must be Number");

    // Process the request
    const body: RequestBody = req.body;
    const productIds: string[] = [...new Set(body.products)];
    const products: Product[] = await findProducts(productIds);
    const solution: Solution = findSolution(products, productIds, body.startingPosition);

    res.setHeader("content-type", "application/json");
    return res.status(200).json(solution);
  } catch (error) {
    return handleError(res, error as Error);
  }
}
