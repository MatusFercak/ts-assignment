# Picking Optimization

## Environment Variables

### BOXPI_API_KEY

API key to get test data of warehouse positions for a specific product identified by productId:

| Question     | Answer       |
| ------------ | ------------ |
| Required     | Yes          |
| Sample Value | `MV......9Z` |

## Run

| #     | Setting                            | command         |
| ----- | ---------------------------------- | --------------- |
| 1     | install the specified dependencies | `npm i`         |
| 2     | Build Commands                     | `npm run build` |
| 3     | Start application                  | `npm run start` |
| `DEV` | Run development                    | `npm run dev`   |

## Usage

### GET /

**Parameters**

| Name             | Description            | Location     | Type          | Sample Value                 |
| ---------------- | ---------------------- | ------------ | ------------- | ---------------------------- |
| products         | productsIds to pick    | Body request | Array<String> | `["product-1", "product-2"]` |
| startingPosition | Postion where we start | Body request | Position      | `{ "x":0,"y":0,"z":0}`       |

**Request**
Request location

```text
Location: http://127.0.0.1:3000
```

Request body:

```json
{
  "products": ["product-1", "product-2", "product-1", "product-2"],
  "startingPosition": {
    "x": 0,
    "y": 0,
    "z": 0
  }
}
```

**Response**

Sample `200` Response:

```json
{
  "pickingOrder": [
    {
      "productId": "product-1",
      "positionId": "position-31"
    },
    {
      "productId": "product-2",
      "positionId": "position-241"
    }
  ],
  "distance": 15
}
```
