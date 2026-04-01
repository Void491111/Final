import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "De-Mooiste-Cafe",
  description: "Pesan menu favorit kamu disini",
};

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={poppins.className}>
        <div className="relative mx-auto min-h-screen w-full max-w-[430px] bg-white overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}