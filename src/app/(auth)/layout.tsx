export const metadata = {
  title: "Login — GXT Hotel",
  description: "Acesso ao sistema — GXT Hotel",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
