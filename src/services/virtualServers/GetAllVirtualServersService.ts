import { VirtualServer } from "@prisma/client";
import { VirtualServerRepository } from "../../repositories/VirtualServerRepository";

export interface VirtualServerDomain {
  id: string;
  name: string;
  status: string;
  port: number;
  mode: string;
  balance: string;
  backends: string[];
  maxConn: number;
  maxQueue: number;
  timeouts: {
    connect: number;
    client: number;
    server: number;
    queue: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface GetAllVirtualServersResponse {
  virtualServers: VirtualServerDomain[];
}

export class GetAllVirtualServersService {
  constructor(private virtualServerRepository: VirtualServerRepository) {}

  async execute(): Promise<GetAllVirtualServersResponse> {
    const virtualServers = await this.virtualServerRepository.findAll();

    return { virtualServers };
  }
}
