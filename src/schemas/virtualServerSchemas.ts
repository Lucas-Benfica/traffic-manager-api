import { z } from "zod";

const virtualServerBody = {
  name: z.string().min(3, "Name must have at least 3 characters"),
  port: z.number(),
  mode: z.enum(["http", "https"]),
  balance: z.enum(["roundrobin", "cookie"]),
  backends: z.array(z.string()).min(1, "Add at least one backend"),
  maxConn: z.number().min(1),
  maxQueue: z.number().min(1),
  timeouts: z.object({
    connect: z.number().min(0),
    client: z.number().min(0),
    server: z.number().min(0),
    queue: z.number().min(0),
  }),
};

export const createVirtualServerSchema = z.object({
  body: z.object(virtualServerBody),
});

export const updateVirtualServerSchema = z.object({
  body: z.object(virtualServerBody),
  params: z.object({
    id: z.uuid({ version: "v4" }),
  }),
});

export const virtualServerIdSchema = z.object({
  params: z.object({
    id: z.uuid({ version: "v4" }),
  }),
});

export type CreateVirtualServerDTO = z.infer<
  typeof createVirtualServerSchema
>["body"];
