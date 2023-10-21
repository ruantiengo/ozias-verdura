import "@/styles/globals.css";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts"
import { ThemeProvider } from "@/providers/theme-provider";
import { MainNav } from "@/components/main-nav";
import { SiteHeader } from "@/components/header";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider headers={headers()}>
            <SiteHeader/>
            {children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
