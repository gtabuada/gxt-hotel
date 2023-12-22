import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export const metadata = {
  title: "Login — GXT Hotel",
  description: "Acesso ao sistema — GXT Hotel",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (session?.user) {
    redirect("/");
  }

  return <div>{children}</div>;
}
