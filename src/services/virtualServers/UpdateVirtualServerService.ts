import { VirtualServerRepository } from "../../repositories/VirtualServerRepository";
import { VirtualServerDomain } from "./GetAllVirtualServersService";

interface UpdateVirtualServerRequest {
  id: string;
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

interface UpdateVirtualServerResponse {
  virtualServer: VirtualServerDomain;
}

export class UpdateVirtualServerService {
  constructor(private virtualServerRepository: VirtualServerRepository) {}

  async execute({
    id,
    ...data
  }: UpdateVirtualServerRequest): Promise<UpdateVirtualServerResponse> {
    const serverExists = await this.virtualServerRepository.findById(id);
    if (!serverExists) {
      throw new Error("Virtual Server not found");
    }

    // if (![80, 443].includes(data.port)) {
    //   throw new Error("Port not allowed. Use 80 or 443.");
    // }

    if (data.backends.length === 0) {
      throw new Error("You must provide at least one backend server.");
    }

    const virtualServer = await this.virtualServerRepository.update(id, data);

    return { virtualServer };
  }
}
