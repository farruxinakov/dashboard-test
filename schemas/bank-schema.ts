import { z } from "zod";

export const bankSchema = z.object({
  name: z.string().trim(),
});
