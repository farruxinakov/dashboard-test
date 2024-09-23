import { z } from "zod";

export const tableSchema = z.object({
  group: z.string().min(1).trim(),
  performer: z.string().min(1).trim(),
  partner_name: z.string().min(1).trim(),
  partner_contact: z.string().min(1).trim(),
  request: z.string().min(1).trim(),
  response_to_a_request: z.string().min(1).trim(),
  request_solution_date: z.string().min(1).trim(),
  solving_request_in_days: z.string().min(1).trim(),
  feedback: z.string().min(1).trim(),
  source: z.string().min(1).trim(),
  status: z.string().min(1).trim(),
});
