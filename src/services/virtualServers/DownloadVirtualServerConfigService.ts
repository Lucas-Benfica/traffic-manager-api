import { VirtualServerRepository } from "../../repositories/VirtualServerRepository";

interface DownloadConfigResponse {
  filename: string;
  content: string;
}

export class DownloadVirtualServerConfigService {
  constructor(private virtualServerRepository: VirtualServerRepository) {}

  async execute(id: string): Promise<DownloadConfigResponse> {
    const server = await this.virtualServerRepository.findById(id);

    if (!server) {
      throw new Error("Virtual Server not found");
    }

    const formattedBackends = server.backends.map((backendString: string) => {
      const [address, port] = backendString.split(":");
      return {
        address: address,
        port: port ? parseInt(port, 10) : 80,
      };
    });

    const configData = {
      name: server.name,
      port: server.port,
      mode: server.mode,
      balance: server.balance,
      backends: formattedBackends,
      maxConn: server.maxConn,
      maxQueue: server.maxQueue,
      timeouts: server.timeouts,
    };

    const content = JSON.stringify(configData, null, 2);
    const filename = `${server.name.toLowerCase().replace(/\s+/g, "-")}.json`;

    return { filename, content };
  }
}
