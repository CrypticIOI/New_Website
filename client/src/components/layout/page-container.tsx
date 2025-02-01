import { TopNav } from "./top-nav";
import { AnimatedBackground } from "./animated-background";

interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <AnimatedBackground />
      <TopNav />
      <main className="flex-1 p-6 container mx-auto">{children}</main>
    </div>
  );
}