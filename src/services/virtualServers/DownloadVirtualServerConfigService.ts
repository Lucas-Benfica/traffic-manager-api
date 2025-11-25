import { VirtualServerRepository } from "../../repositories/VirtualServerRepository";
import fs from 'fs';
import path from 'path';

interface DownloadConfigResponse {
  filename: string;
  content: string;
  savedPath: string; // Retornamos o caminho para saber onde foi salvo
}

export class DownloadVirtualServerConfigService {
  constructor(private virtualServerRepository: VirtualServerRepository) {}

  async execute(id: string): Promise<DownloadConfigResponse> {
    const server = await this.virtualServerRepository.findById(id);

    if (!server) {
      throw new Error("Virtual Server not found");
    }

    // 1. Formatar os dados
    const formattedBackends = server.backends.map((backendString: string) => {
      const [address, port] = backendString.split(':');
      return {
        address: address,
        port: port ? parseInt(port, 10) : 80
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
      timeouts: server.timeouts
    };

    const content = JSON.stringify(configData, null, 2);
    const filename = `${server.name.toLowerCase().replace(/\s+/g, '-')}.json`;

    // 2. Salvar no Disco (Volume Compartilhado)
    
    // Pega o diretório da variável de ambiente (definida no docker-compose)
    // Se não tiver definida, usa uma pasta 'server_configs' dois níveis acima
    const outputDir = process.env.CONFIG_OUTPUT_DIR || path.resolve(__dirname, '..', '..', 'server_configs');

    // Garante que a pasta existe
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const fullPath = path.join(outputDir, filename);

    try {
      // Escreve o arquivo no disco
      fs.writeFileSync(fullPath, content);
      console.log(`Arquivo de configuração salvo em: ${fullPath}`);
    } catch (error) {
      console.error("Erro ao salvar arquivo no volume:", error);
      // Opcional: lançar erro se a escrita for obrigatória
      // throw new Error("Falha ao salvar arquivo no disco");
    }

    return { filename, content, savedPath: fullPath };
  }
}