import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionDialog from "@/components/SubscriptionDialog";
import { AudioPlayerProvider } from "@/components/AudioPlayerContext";
import AudioPlayerBar from "@/components/AudioPlayerBar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://evangelisttolucci.com"),
  title: "Evangelist Tolucci | Official Digital Ministry Platform",
  description:
    "The official digital home of Evangelist Tolucci. Prophetic worship, revival sermons, daily devotionals, published books, and ministry invitations.",
  keywords: [
    "Evangelist Tolucci",
    "Tolucci",
    "The MASS Movement",
    "Spirit of the Prophets",
    "Revival Sermons",
    "Daily Devotionals",
    "Kingdom Sounds",
  ],
  authors: [{ name: "Evangelist Tolucci" }],
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    title: "Evangelist Tolucci — A Voice for Revival",
    description:
      "A Voice for Revival. A Life Set Apart for His Presence. Access sermons, daily devotionals, books, and prophetic sounds.",
    url: "https://evangelisttolucci.com",
    siteName: "Evangelist Tolucci Official",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="bg-[#0f0e0d] text-[#f7f4ee] font-sans antialiased selection:bg-[#c8a97e] selection:text-[#0f0e0d] min-h-screen flex flex-col justify-between">
        <AudioPlayerProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <AudioPlayerBar />
          <SubscriptionDialog />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
