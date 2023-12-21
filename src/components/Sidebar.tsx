import Link from "next/link";
import { sidebarLinks } from "~/constants/sidebar-links";

export function Sidebar() {
  return (
    <aside className="flex min-w-fit flex-col border-r border-r-border px-16 py-12">
      <h1>Hotel</h1>

      <ul>
        {sidebarLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
