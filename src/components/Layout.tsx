import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileCTA } from "./MobileCTA";
import { AccessibilityToolbar } from "./AccessibilityToolbar";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useScrollReveal();
  return (
    <div className="min-h-screen flex flex-col rtl">
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
      <MobileCTA />
      <AccessibilityToolbar />
    </div>
  );
}