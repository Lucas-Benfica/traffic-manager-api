import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import { VirtualServerRepository } from "../../repositories/VirtualServerRepository";
import { VirtualServerDomain } from "./GetAllVirtualServersService";

interface UpdateStatusRequest {
  id: string;
  status: string;
}

interface UpdateStatusResponse {
  virtualServer: VirtualServerDomain;
}

export class UpdateVirtualServerStatusService {
  constructor(private virtualServerRepository: VirtualServerRepository) {}

  async execute({ id, status }: UpdateStatusRequest): Promise<UpdateStatusResponse> {
    
    const allowedStatuses = ['online', 'offline', 'active', 'deactivated', 'maintenance'];
    
    if (!allowedStatuses.includes(status)) {
      throw new BadRequestError(`Status inválido. Permitidos: ${allowedStatuses.join(', ')}`);
    }

    const serverExists = await this.virtualServerRepository.findById(id);
    if (!serverExists) {
      throw new NotFoundError("Virtual Server not found");
    }

    const virtualServer = await this.virtualServerRepository.updateStatus(id, status);

    return { virtualServer };
  }
}