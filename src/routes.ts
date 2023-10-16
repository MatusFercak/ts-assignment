import { Express, Request, Response } from "express";
import { getSolutionHandler } from "./controller/solution.controller";

function routes(app: Express) {
  app.get("/", getSolutionHandler);
  app.all("/", (req: Request, res: Response) => res.sendStatus(200));
}

export default routes;
