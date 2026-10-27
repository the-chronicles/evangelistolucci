"use client";

import { usePathname } from "next/navigation";
import AudioPlayerBar from "@/components/AudioPlayerBar";
import { AudioPlayerProvider } from "@/components/AudioPlayerContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SubscriptionDialog from "@/components/SubscriptionDialog";

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <AudioPlayerProvider>
      {isAdminRoute ? (
        children
      ) : (
        <>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <SubscriptionDialog />
          <AudioPlayerBar />
        </>
      )}
    </AudioPlayerProvider>
  );
}
