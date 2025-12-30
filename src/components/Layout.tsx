import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileCTA } from "./MobileCTA";
import { AccessibilityToolbar } from "./AccessibilityToolbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col rtl">
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