import type { UserRole } from "~/server/db/user/user.schema";

export const getRoleString = (role: UserRole) => {
  const map: Record<UserRole, string> = {
    admin: "Administrador",
    client: "Cliente",
    master: "Master",
  };

  return map[role];
};
