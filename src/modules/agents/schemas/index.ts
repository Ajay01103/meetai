import * as z from "zod/v4"

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  instructions: z.string().min(1, { message: "instructions is required" }),
})

export const agentsUpdateSchema = agentsInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
})
