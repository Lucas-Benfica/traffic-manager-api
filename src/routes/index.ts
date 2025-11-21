import { Router } from "express";
import { virtualServerRoutes } from "./virtualServerRoutes";

const router = Router();

router.use("/virtual-servers", virtualServerRoutes);

export { router };