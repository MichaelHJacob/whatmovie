import { discoverSchema } from "@/lib/validation/discoverSchema";
import { z } from "zod";

export const discoverWithDates = discoverSchema.extend({
  dates: z.object({ maximum: z.string().date(), minimum: z.string().date() }),
});
