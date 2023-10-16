export interface OrderToPick {
  productId: string;
  positionId: string;
}

export interface Solution {
  pickingOrder: OrderToPick[];
  distance: number;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}
