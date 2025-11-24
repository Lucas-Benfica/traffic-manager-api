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

    // Montando o conteúdo do arquivo TXT
    const lines = [
      `# Configuration for ${server.name}`,
      `port ${server.port}`,
      `mode ${server.mode}`,
      `balance ${server.balance}`,
      '',
      `maxconn ${server.maxConn}`,
      `maxqueue ${server.maxQueue}`,
      '',
      `timeout connect ${server.timeouts.connect}s`,
      `timeout client ${server.timeouts.client}s`,
      `timeout server ${server.timeouts.server}s`,
      `timeout queue ${server.timeouts.queue}s`,
      '',
      '# Backends',
      ...server.backends.map((backend: string) => `backend ${backend}`),
    ];

    const content = lines.join('\n');
    const filename = `${server.name.toLowerCase().replace(/\s+/g, '-')}.cfg`; // Ex: meu-server.cfg

    return { filename, content };
  }
}