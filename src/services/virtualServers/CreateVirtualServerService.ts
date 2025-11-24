import { VirtualServerRepository } from "../../repositories/VirtualServerRepository";

interface CreateVirtualServerRequest {
  name: string;
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
}

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

interface CreateVirtualServerResponse {
  virtualServer: VirtualServerDomain;
}

export class CreateVirtualServerService {
  constructor(private virtualServerRepository: VirtualServerRepository) {}

  async execute(
    data: CreateVirtualServerRequest
  ): Promise<CreateVirtualServerResponse> {
    // if (![80, 443].includes(data.port)) {
    //   throw new Error("Port not allowed. Use 80 or 443.");
    // }

    const virtualServer = await this.virtualServerRepository.create(data);

    return { virtualServer };
  }
}
