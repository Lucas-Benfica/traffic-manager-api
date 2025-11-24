import { Request, Response } from "express";
import { VirtualServerRepository } from "../repositories/VirtualServerRepository";
import { GetAllVirtualServersService } from "../services/virtualServers/GetAllVirtualServersService";
import { CreateVirtualServerService } from "../services/virtualServers/CreateVirtualServerService";
import { UpdateVirtualServerStatusService } from "../services/virtualServers/UpdateVirtualServerStatusService";
import { DeleteVirtualServerService } from "../services/virtualServers/DeleteVirtualServerService";
import { UpdateVirtualServerService } from "../services/virtualServers/UpdateVirtualServerService";
import { DownloadVirtualServerConfigService } from "../services/virtualServers/DownloadVirtualServerConfigService";

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

export async function updateStatusVirtualServerController(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  const { status } = req.body;

  const virtualServerRepository = new VirtualServerRepository();
  const updateVirtualServerStatusService = new UpdateVirtualServerStatusService(
    virtualServerRepository
  );

  const response = await updateVirtualServerStatusService.execute({
    id,
    status,
  });

  return res.status(200).json(response);
}

export async function deleteVirtualServerController(
  req: Request,
  res: Response
) {
  const { id } = req.params;

  const virtualServerRepository = new VirtualServerRepository();
  const deleteVirtualServerService = new DeleteVirtualServerService(
    virtualServerRepository
  );

  await deleteVirtualServerService.execute({ id });

  return res.status(204).send();
}

export async function updateVirtualServerController(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  const data = req.body;

  const virtualServerRepository = new VirtualServerRepository();
  const updateVirtualServerService = new UpdateVirtualServerService(
    virtualServerRepository
  );

  const response = await updateVirtualServerService.execute({ id, ...data });

  return res.status(200).json(response);
}

export async function downloadVirtualServerConfigController(
  req: Request,
  res: Response
) {
  const { id } = req.params;

  const virtualServerRepository = new VirtualServerRepository();
  const downloadVirtualServerConfigService =
    new DownloadVirtualServerConfigService(virtualServerRepository);

  const { filename, content } =
    await downloadVirtualServerConfigService.execute(id);

  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  res.setHeader("Content-Type", "text/plain");

  return res.send(content);
}
