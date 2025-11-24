import { VirtualServerRepository } from "../../repositories/VirtualServerRepository";
import { NotFoundError } from "../../errors/NotFoundError";

interface DeleteVirtualServerRequest {
  id: string;
}

export class DeleteVirtualServerService {
  constructor(private virtualServerRepository: VirtualServerRepository) {}

  async execute({ id }: DeleteVirtualServerRequest): Promise<void> {
    const serverExists = await this.virtualServerRepository.findById(id);
    if (!serverExists) {
      throw new NotFoundError("Virtual Server not found");
    }

    await this.virtualServerRepository.delete(id);
  }
}