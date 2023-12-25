import { redirect } from "next/navigation";
import { Sidebar } from "~/components/Sidebar";
import { getServerAuthSession } from "~/server/auth";

export const metadata = {
  title: "GXT Hotel",
  description: "Gestão de alojamento, reservas e hóspedes",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main className="h-full w-full overflow-y-auto px-16 py-12 text-foreground">
        {children}
      </main>
    </div>
  );
}
