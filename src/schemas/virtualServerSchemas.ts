import { z } from "zod";

export const createVirtualServerSchema = z.object({
  body: z.object({
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
  }),
});
