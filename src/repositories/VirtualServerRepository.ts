import { prisma } from "../lib/prisma";

interface CreateVirtualServerParams {
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

export class VirtualServerRepository {
  private mapToDomain(server: any) {
    return {
      id: server.id,
      name: server.name,
      status: server.status,
      port: server.port,
      mode: server.mode,
      balance: server.balance,
      backends: server.backends,
      maxConn: server.maxConn,
      maxQueue: server.maxQueue,

      timeouts: {
        connect: server.timeoutConnect,
        client: server.timeoutClient,
        server: server.timeoutServer,
        queue: server.timeoutQueue,
      },

      createdAt: server.createdAt,
      updatedAt: server.updatedAt,
    };
  }

  async findAll() {
    const servers = await prisma.virtualServer.findMany({
      orderBy: { createdAt: "desc" },
    });

    return servers.map(this.mapToDomain);
  }

  async findById(id: string) {
    const server = await prisma.virtualServer.findUnique({
      where: { id },
    });

    if (!server) return null;

    return this.mapToDomain(server);
  }

  async create(data: CreateVirtualServerParams) {
    const { timeouts, ...rest } = data;

    const server = await prisma.virtualServer.create({
      data: {
        ...rest,

        timeoutConnect: timeouts.connect,
        timeoutClient: timeouts.client,
        timeoutServer: timeouts.server,
        timeoutQueue: timeouts.queue,

        status: "offline",
      },
    });

    return this.mapToDomain(server);
  }
}
