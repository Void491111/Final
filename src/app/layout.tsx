import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import InfoMejaModal from "./components/modals/InfoMejamodal";
import PageTransition from "./components/PageTransition";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "De-Mooiste-Cafe",
  description: "Order your favorite drinks & food",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={poppins.className}>
        {/* Mobile-first container: max-width like a phone, centered on desktop */}
        <div className="relative mx-auto min-h-screen w-full max-w-[430px] bg-white overflow-x-hidden">
          <PageTransition>{children}</PageTransition>
          <InfoMejaModal />
        </div>
      </body>
    </html>
  );
}