import { z } from "zod";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { type IconName } from "~/components/Icon";

/* 🧙🏻‍♂️ */
const icons = [...Object.keys(dynamicIconImports)] as readonly IconName[];
const iconEnum = z.enum([icons[0]!, ...icons.slice(1)]);

export const createAmenityInput = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  quantity: z.number().int().min(0).default(-1),
  icon: iconEnum.default("alert-triangle"),
});

export type CreateAmenityInput = z.infer<typeof createAmenityInput>;
