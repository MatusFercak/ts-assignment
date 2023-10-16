import { Position } from "./solution.model";

export interface RequestBody {
  products: string[];
  startingPosition: Position;
}

export interface RawProduct {
  positionId: string;
  x: number;
  y: number;
  z: number;
  productId: string;
  quantity: number;
}

export interface Product {
  positionId: string;
  position: Position;
  productId: string;
  quantity: number;
  distance: number;
}
