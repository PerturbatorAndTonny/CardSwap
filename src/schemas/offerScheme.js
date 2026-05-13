import * as z from "zod";

export const offerSchema = z.discriminatedUnion("offerType", [
  z.object({
    offerType: z.literal("card"),
    idCard: z.string()
      .min(1, "La carta publicada es requerida")
      .regex(/^[a-fA-F0-9]{24}$/u, "idCard no es un ObjectId válido"),

    offeredCard: z.string()
      .min(1, "Debes indicar qué carta ofreces")
      .regex(/^[a-fA-F0-9]{24}$/u, "offeredCard no es un ObjectId válido"),

    amount: z.undefined(),
    currency: z.undefined(),
  }),

  z.object({
    offerType: z.literal("money"),

    idCard: z.string()
      .min(1, "La carta publicada es requerida")
      .regex(/^[a-fA-F0-9]{24}$/u, "idCard no es un ObjectId válido"),

    amount: z.number()
      .positive("El monto debe ser mayor a 0"),

    currency: z.enum(["USD", "COP"], {
      errorMap: () => ({ message: "La moneda debe ser USD o COP" })
    }),

    offeredCard: z.undefined(),
  })
])