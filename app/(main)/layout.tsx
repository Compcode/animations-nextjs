import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/navbar";


export const metadata: Metadata = {
  title: "Ten-Twenty Demo",
  description: "A simple demo to showcase frontend dev for Ten-Twenty",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="absolute left-0 right-0 z-20 ">
          <Navbar />
        </header>
        <main>{children}</main>
        <footer className="text-center py-4 bg-[#0C0A3E] text-[#076CDF] text-sm font-semibold">
          <p>
            &copy; {new Date().getFullYear()} TenTwenty Demo. All rights reserved.
          </p>
        </footer>
    </>
      
  );
}
