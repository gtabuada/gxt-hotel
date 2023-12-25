import Link from "next/link";
import { sidebarLinks, sidebarLinksAdmin } from "~/constants/sidebar-links";
import { UserDropdown } from "./UserDropdown";
import { getServerAuthSession } from "~/server/auth";
import { checkRole } from "~/helpers/user";

export async function Sidebar() {
  const session = await getServerAuthSession();

  return (
    <aside className="flex min-w-fit flex-col justify-between border-r border-r-border px-9 py-12">
      <h1>Hotel</h1>

      <ul>
        {sidebarLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      {session?.user && checkRole(session.user, "admin") && (
        <ul>
          <h4>Administração</h4>
          {sidebarLinksAdmin.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      )}

      <UserDropdown user={session?.user} />
    </aside>
  );
}
