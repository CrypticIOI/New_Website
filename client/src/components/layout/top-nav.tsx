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
      <nav className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] max-w-4xl mx-auto">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="font-bold text-white text-xl tracking-wider font-['Space_Mono']">
            CRYPTCORP
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/50 to-transparent mt-0.5" />
          </div>
          <div className="flex-1 flex justify-center space-x-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium text-white/90 rounded-md transition-all duration-200",
                      "hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:scale-105",
                      location === item.href ? "bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)]" : "transparent"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="w-[100px]" />
        </div>
      </nav>
    </div>
  );
}