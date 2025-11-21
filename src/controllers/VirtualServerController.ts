import { Request, Response } from "express";
import { VirtualServerRepository } from "../repositories/VirtualServerRepository";
import { GetAllVirtualServersService } from "../services/virtualServers/GetAllVirtualServersService";
import { CreateVirtualServerService } from "../services/virtualServers/CreateVirtualServerService";

export async function getAllVirtualServersController(
  req: Request,
  res: Response
) {
  const virtualServerRepository = new VirtualServerRepository();
  const getAllVirtualServersService = new GetAllVirtualServersService(
    virtualServerRepository
  );
  const response = await getAllVirtualServersService.execute();
  return res.status(200).json(response.virtualServers);
}

export async function createVirtualServerController(
  req: Request,
  res: Response
) {
  const body = req.body;

  const virtualServerRepository = new VirtualServerRepository();
  const createVirtualServerService = new CreateVirtualServerService(
    virtualServerRepository
  );

  const response = await createVirtualServerService.execute(body);

  return res.status(201).json(response);
}
