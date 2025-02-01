import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Rocket, 
  Factory, 
  BarChart3, 
  Home,
  MenuIcon
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Rocket, label: "Ships", href: "/ships" },
  { icon: Factory, label: "Stations", href: "/stations" },
  { icon: BarChart3, label: "Trade", href: "/trade" },
];

export function Sidebar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">X4 Tools</h2>
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    location === item.href ? "bg-accent" : "transparent"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="ml-2">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[200px] sm:w-[240px]">
          <NavContent />
        </SheetContent>
      </Sheet>

      <div className="hidden lg:block min-h-screen border-r bg-background w-[240px]">
        <NavContent />
      </div>
    </>
  );
}