import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Rocket, Factory, BarChart3, Home } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Rocket, label: "Ships", href: "/ships" },
  { icon: Factory, label: "Stations", href: "/stations" },
  { icon: BarChart3, label: "Trade", href: "/trade" },
];

export function TopNav() {
  const [location] = useLocation();

  return (
    <div className="w-full px-4 pt-4">
      <nav className="rounded-lg border border-white/10 bg-white/10 backdrop-blur-sm shadow-lg max-w-4xl mx-auto">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="font-bold text-white text-xl">CRYPTCORP</div>
          <div className="flex-1 flex justify-center space-x-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 rounded-md transition-colors",
                      location === item.href ? "bg-white/20" : "transparent"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="w-[100px]" /> {/* Spacer to balance the layout */}
        </div>
      </nav>
    </div>
  );
}