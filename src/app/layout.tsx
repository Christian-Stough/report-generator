import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Report Generator",
  description: "Built by Me :) (Platy_Dev)",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`dark font-sans ${inter.variable}`}>
        <div className="grid h-screen grid-rows-[auto,1fr]">
          <div className="w-full border-b-2 p-4 drop-shadow">Nav Bar</div>
          <main className="overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
