import "styles/tailwind.css";

import { Inter } from "@next/font/google";
import Navbar from "components/Navbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <UserProvider>
          <Navbar />
          <>{children}</>
        </UserProvider>
      </body>
    </html>
  );
}
