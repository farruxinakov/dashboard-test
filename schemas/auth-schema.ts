import { z } from "zod";

export const authSchema = z.object({
  name: z.string().trim().nonempty("Name is required."),
  password: z.string().trim().nonempty("Password is required."),
});
