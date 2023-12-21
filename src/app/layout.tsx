import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";

import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Sidebar } from "~/components/Sidebar";

export const metadata = {
  title: "GXT Hotel",
  description: "Gestão de quartos, reservas e hóspedes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ptBR" className={GeistSans.className}>
      <body className="dark">
        <TRPCReactProvider cookies={cookies().toString()}>
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <main className="h-full w-full overflow-y-auto px-16 py-12 text-foreground">
              {children}
            </main>
          </div>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
