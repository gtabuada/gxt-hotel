import { string, z } from "zod";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { type IconName } from "~/components/Icon";

/* 🧙🏻‍♂️ */
const icons = [...Object.keys(dynamicIconImports)] as readonly IconName[];
const iconEnum = z.enum([icons[0]!, ...icons.slice(1)]);

export const createAmenityInput = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  quantity: z.number().int().default(-1).optional(),
  icon: iconEnum.default("alert-triangle"),
});

export type CreateAmenityInput = z.infer<typeof createAmenityInput>;

export const updateAmenityInput = z.object({
  id: string().cuid2(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  quantity: z.number().int().optional(),
  icon: iconEnum.optional(),
});

export type UpdateAmenityInput = z.infer<typeof updateAmenityInput>;
