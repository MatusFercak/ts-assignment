import express, { Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";

const app = express();
const port = 3000;
const address = "127.0.0.1";

dotenv.config();
app.use(express.json());
app.listen(port, address, () => {
  routes(app);
  console.log(`App running at http://${address}:${port}`);
});
