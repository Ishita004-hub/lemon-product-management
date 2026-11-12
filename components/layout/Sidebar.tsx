"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Store,
  Package,
  BookOpen,
  Tag,
  BarChart3,
  FileText,
  Settings,
  ChevronRight,
  Circle,
} from "lucide-react";

import type { NavigationItem } from "@/types/navigation";

const icons = {
  Home,
  Stores: Store,
  Products: Package,
  Catalogue: BookOpen,
  Promotions: Tag,
  Reports: BarChart3,
  Docs: FileText,
  Settings,
};

const items: NavigationItem[] = [
  { label: "Home", href: "/placeholder/home", icon: "Home" },
  { label: "Stores", href: "/placeholder/stores", icon: "Stores" },
  { label: "Products", href: "/products", icon: "Products" },
  { label: "Catalogue", href: "/placeholder/catalogue", icon: "Catalogue" },
  { label: "Promotions", href: "/placeholder/promotions", icon: "Promotions" },
  { label: "Reports", href: "/placeholder/reports", icon: "Reports" },
  { label: "Docs", href: "/placeholder/docs", icon: "Docs" },
  { label: "Settings", href: "/placeholder/settings", icon: "Settings" },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[230px] shrink-0 flex-col border-r border-[#ececec] bg-white">
      {/* Lemon Inc. Logo */}
      <div className="px-6 pt-6">
        <div className="flex h-[48px] w-[116px] items-center justify-center rounded-[5px] bg-[#108F8C]">
          {/* Lemon Slice Icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="31" cy="31" r="28" stroke="#F4E900" strokeWidth="5" />

            <circle cx="31" cy="31" r="22" stroke="#F4E900" strokeWidth="2.5" />

            <path
              d="M31 9V53M9 31H53M15.5 15.5L46.5 46.5M46.5 15.5L15.5 46.5"
              stroke="#F4E900"
              strokeWidth="3"
            />

            <circle cx="31" cy="31" r="3" fill="#F4E900" />
          </svg>

          {/* Logo Text */}
          <span className="ml-1 text-[19px] font-light leading-[17px] tracking-[1px] text-white">
            lemon
            <br />
            inc.
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 mt-4 border-t border-[#ededed]" />

      {/* Navigation */}
      <nav className="mt-3 flex-1 px-3">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");

          const Icon = icons[item.label as keyof typeof icons];

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={`mb-1 flex h-8 items-center gap-3 rounded-[6px] px-3 text-[11px] transition-colors ${
                active
                  ? "bg-[#e9f6ff] text-[#168fd5] font-medium"
                  : "text-[#333] hover:bg-[#f6f6f6]"
              }`}
            >
              <span className="grid h-3 w-3 place-items-center rounded-[3px] border border-[#d8d8d8]">
                {active && <Circle size={5} fill="currentColor" />}
              </span>

              <Icon size={13} strokeWidth={1.7} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Divider */}
      <div className="mx-4 border-t border-[#ededed]" />

      {/* User Profile */}
      <div className="flex items-center gap-2 px-4 py-4">
        <div className="h-7 w-7 overflow-hidden rounded-full bg-[#d9b39b] text-center text-[13px] leading-7">
          👨🏻
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-medium">Andy Samberg</p>

          <p className="truncate text-[9px] text-[#aaa]">
            andy.samberg@gmail.com
          </p>
        </div>

        <ChevronRight size={13} className="text-[#168fd5]" />
      </div>
    </aside>
  );
}
