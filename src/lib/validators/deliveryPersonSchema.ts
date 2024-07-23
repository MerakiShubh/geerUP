import { z } from "zod";

export const deliveryPersonSchema = z.object({
  name: z.string({ message: "Delivery person name should be string" }),
  phone: z
    .string({ message: "Phone should be string" })
    .length(13, "Delivery perosn phone should be 13 chars long"),
  warehouseId: z.number({ message: "Warehouse id should be a number" }),
});
