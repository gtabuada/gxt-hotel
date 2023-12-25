import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";

import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "GXT Hotel",
  description: "Gestão de alojamento, reservas e hóspedes",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ptBR" className={GeistSans.className}>
      <body className="dark overflow-hidden">
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
