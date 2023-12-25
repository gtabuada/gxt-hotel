import type { User } from "next-auth";
import type { UserRole } from "~/server/db/user/user.schema";

export function checkRole(user: User, role: UserRole | UserRole[]) {
  const _role = Array.isArray(role) ? role : [role];
  return _role.includes(user.role);
}
