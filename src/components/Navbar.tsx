"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, FolderOpen, LayoutDashboard } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const baseNavItems = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/map", label: "نقشه", icon: MapPin },
  { href: "/case/new", label: "پرونده", icon: FolderOpen },
];

const dashboardItem = { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard };

export function Navbar() {
  const pathname = usePathname();
  const role = useAppStore((s) => s.role);

  const navItems =
    role === "specialist" || role === "local_guide"
      ? [...baseNavItems, dashboardItem]
      : baseNavItems;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-t border-green-100 safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive
                  ? "text-green-700 bg-green-50"
                  : "text-earth-700 hover:text-green-600"
              )}
            >
              <item.icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
