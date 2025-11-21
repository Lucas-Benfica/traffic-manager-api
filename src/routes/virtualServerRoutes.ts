import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { createVirtualServerSchema } from "../schemas/virtualServerSchemas";
import {
  createVirtualServerController,
  getAllVirtualServersController,
} from "../controllers/VirtualServerController";

const virtualServerRoutes = Router();

virtualServerRoutes.get("/", getAllVirtualServersController);
virtualServerRoutes.post(
  "/",
  validateRequest(createVirtualServerSchema),
  createVirtualServerController
);

export { virtualServerRoutes };
