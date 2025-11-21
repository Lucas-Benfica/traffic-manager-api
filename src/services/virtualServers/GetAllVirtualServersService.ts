import { VirtualServer } from "@prisma/client";
import { VirtualServerRepository } from "../../repositories/VirtualServerRepository";

interface GetAllVirtualServersResponse {
  virtualServers: VirtualServer[];
}

export class GetAllVirtualServersService {
  constructor(private virtualServerRepository: VirtualServerRepository) {}

  async execute(): Promise<GetAllVirtualServersResponse> {
    const virtualServers = await this.virtualServerRepository.getAll();

    return { virtualServers };
  }
}
