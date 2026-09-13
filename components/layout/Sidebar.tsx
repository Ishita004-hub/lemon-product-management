"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight, Circle } from "lucide-react";

const items = [
  {
    label: "Home",
    href: "/placeholder/home",
  },
  {
    label: "Stores",
    href: "/placeholder/stores",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Catalogue",
    href: "/placeholder/catalogue",
  },
  {
    label: "Promotions",
    href: "/placeholder/promotions",
  },
  {
    label: "Reports",
    href: "/placeholder/reports",
  },
  {
    label: "Docs",
    href: "/placeholder/docs",
  },
  {
    label: "Settings",
    href: "/placeholder/settings",
  },
];

export function Sidebar({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[230px] shrink-0 flex-col border-r border-[#ececec] bg-white">
      {/* LOGO */}
      <div className="px-4 pt-4">
        <div className="flex h-9 w-[74px] items-center justify-center">
          <img
            src="/images/logo.png"
            alt="Lemon Inc."
            className="h-9 w-auto object-contain"
          />
        </div>
      </div>

      {/* DIVIDER */}
      <div className="mx-4 mt-4 border-t border-[#ededed]" />

      {/* NAVIGATION */}
      <nav className="mt-3 flex-1 px-3">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={`mb-3 flex h-10 items-center gap-3 rounded-[6px] px-3 text-[14px] leading-[20px] transition-colors ${
                active
                  ? "bg-[#e9f6ff] font-normal text-[#168fd5]"
                  : "text-[#000000] hover:bg-[#f6f6f6]"
              }`}
            >
              {/* 20 × 20 RECTANGLE */}
              <span className="grid h-[20px] w-[20px] shrink-0 place-items-center rounded-[4px] border border-[#000000] bg-[#F5F5F5]">
                {active && (
                  <Circle
                    size={6}
                    fill="currentColor"
                  />
                )}
              </span>

              {/* MENU TEXT */}
              <span className="font-normal">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* DIVIDER */}
      <div className="mx-4 border-t border-[#ededed]" />

      {/* USER */}
      <div className="flex items-center gap-2 px-4 py-4">
        <div className="h-7 w-7 overflow-hidden rounded-full bg-[#d9b39b] text-center text-[13px] leading-7">
          👨🏻
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-medium">
            Andy Samberg
          </p>

          <p className="truncate text-[9px] text-[#aaa]">
            andy.samberg@gmail.com
          </p>
        </div>

        <ChevronRight
          size={13}
          className="text-[#168fd5]"
        />
      </div>
    </aside>
  );
}
