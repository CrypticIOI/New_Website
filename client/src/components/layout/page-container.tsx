import { TopNav } from "./top-nav";

interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="min-h-screen flex flex-col text-foreground bg-[#070B14]">
      <TopNav />
      <main className="flex-1 px-6 pt-4 pb-6 container mx-auto">{children}</main>
    </div>
  );
}