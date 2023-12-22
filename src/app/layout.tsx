import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";

import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

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
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
