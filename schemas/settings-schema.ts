import { z } from "zod";

export const settingsSchema = z.object({
  name: z.string().min(1).trim(),
});
