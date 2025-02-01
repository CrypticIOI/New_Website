import { TopNav } from "./top-nav";

interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <TopNav />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}