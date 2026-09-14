import { SiteFooter, SiteHeader } from "@/components/marketing/site-chrome";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
