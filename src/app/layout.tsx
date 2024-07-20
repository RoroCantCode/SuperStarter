import "~/styles/globals.css";

import NavBar from "~/components/NavBar";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";

export const metadata = {
  title: "BoilerGram",
  description: "Your new favorite social media platform.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="bg-orange-50">
        <header className="fixed">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  </ClerkProvider>
  );
}
