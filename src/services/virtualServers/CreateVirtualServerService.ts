import { VirtualServer } from "@prisma/client";
import { VirtualServerRepository } from "../../repositories/VirtualServerRepository";

interface CreateVirtualServerRequest {
  name: string;
  port: number;
  mode: "http" | "https";
  balance: "roundrobin" | "cookie";
  backends: string[];
  maxConn: number;
  maxQueue: number;
  timeouts: {
    connect: string;
    client: string;
    server: string;
    queue: string;
  };
}

interface CreateVirtualServerResponse {
  virtualServer: VirtualServer;
}

export class CreateVirtualServerService {
  constructor(private virtualServerRepository: VirtualServerRepository) {}

  async execute({
    name,
    port,
    mode,
    balance,
    backends,
    maxConn,
    maxQueue,
    timeouts,
  }: CreateVirtualServerRequest): Promise<CreateVirtualServerResponse> {
    // if (![80, 443].includes(port)) {
    //   throw new Error("Port not allowed. Please use 80 or 443.");
    // }

    const virtualServer = await this.virtualServerRepository.create({
      name,
      port,
      mode,
      balance,
      backends,
      maxConn,
      maxQueue,
      timeouts,
    });

    return { virtualServer };
  }
}
