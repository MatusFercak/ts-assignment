import { Response } from "express";

export class InternalError extends Error {
  constructor(public message: string, public code: number) {
    super();
  }
}

export class ExternalError extends Error {
  constructor(public message: string, public code: number) {
    super();
  }
}

export class MissingError extends Error {
  constructor(public message: string, public code: number, public missing: string[]) {
    super();
  }
}

export class IlegalType extends Error {
  constructor(public message: string, public code: number, public ilegalType: any[]) {
    super();
  }
}

/**
 * Handles and responds to different types of errors in an HTTP response.
 */
export function handleError(res: Response, error: Error) {
  if (error instanceof InternalError || error instanceof ExternalError || error instanceof MissingError || error instanceof IlegalType) {
    return res.status(error.code).json(error);
  }
  res.status(400).json(error);
}

/**
 * Throws a `MissingError` if any of the specified keys are missing from the object.
 *
 * @param obj - The object to be checked for missing keys.
 * @param keys - An array of keys that are required to be present in the object.
 * @param message - A custom error message to be included in the `MissingError`.
 * @throws MissingError - Throws a `MissingError` if any of the specified keys are missing.
 */
export function throwIfMissing(obj: any, keys: string[], message: string) {
  const missing: string[] = [];
  keys.map((key) => {
    if (!(key in obj) || obj[key] === undefined) {
      missing.push(key);
    }
  });
  if (missing.length > 0) {
    throw new MissingError(message, 400, missing);
  }
}

/**
 * Throws an `IlegalType` error if any of the values in the array have an illegal data type.
 *
 * @param array - The array to be checked for illegal data types.
 * @param type - The expected data type as a string (e.g., "string", "number").
 * @param message - A custom error message to be included in the `IlegalType` error.
 * @throws IlegalType - Throws an `IlegalType` error if any values in the array have an illegal data type.
 */
export function throwIfIlegalTypeInArray(array: any[], type: string, message: string) {
  let ilegalTypes: any[] = [];
  if (!Array.isArray(array)) {
    ilegalTypes.push(JSON.stringify(array));
  } else {
    array.map((obj: any) => {
      if (typeof obj !== type) {
        ilegalTypes.push(obj);
      }
    });
  }
  if (ilegalTypes.length > 0) {
    throw new IlegalType(message, 400, ilegalTypes);
  }
}

/**
 * Throws an `IlegalType` error if any of the values in the object have an illegal data type for specified keys.
 *
 * @param obj - The object to be checked for illegal data types.
 * @param keys - An array of keys in the object to check.
 * @param type - The expected data type as a string (e.g., "string", "number").
 * @param message - A custom error message to be included in the `IlegalType` error.
 * @throws IlegalType - Throws an `IlegalType` error if any values in the object have an illegal data type for specified keys.
 */
export function throwIfIlegalTypeInObject(obj: any, keys: string[], type: string, message: string) {
  let ilegalTypes: any[] = [];
  keys.map((key) => {
    if (typeof obj[key] !== type) {
      ilegalTypes.push({ property: key, value: obj[key] });
    }
  });
  if (ilegalTypes.length > 0) {
    throw new IlegalType(message, 401, ilegalTypes);
  }
}
