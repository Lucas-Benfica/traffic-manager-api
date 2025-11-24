import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import {
  createVirtualServerSchema,
  updateVirtualServerSchema,
  virtualServerIdSchema,
} from "../schemas/virtualServerSchemas";
import {
  createVirtualServerController,
  deleteVirtualServerController,
  downloadVirtualServerConfigController,
  getAllVirtualServersController,
  updateStatusVirtualServerController,
  updateVirtualServerController,
} from "../controllers/VirtualServerController";

const virtualServerRoutes = Router();

virtualServerRoutes.get("/", getAllVirtualServersController);
virtualServerRoutes.post(
  "/",
  validateRequest(createVirtualServerSchema),
  createVirtualServerController
);
virtualServerRoutes.patch(
  "/:id/status",
  validateRequest(virtualServerIdSchema),
  updateStatusVirtualServerController
);
virtualServerRoutes.delete(
  "/:id",
  validateRequest(virtualServerIdSchema),
  deleteVirtualServerController
);
virtualServerRoutes.patch(
  "/:id",
  validateRequest(updateVirtualServerSchema),
  updateVirtualServerController
);
virtualServerRoutes.get(
  "/:id/config",
  validateRequest(virtualServerIdSchema),
  downloadVirtualServerConfigController
);

export { virtualServerRoutes };
