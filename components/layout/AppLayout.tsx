"use client";

import { useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Drawer } from "@/components/ui/Drawer";

export function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="hidden h-screen lg:flex">
        <Sidebar />
      </div>

      <div className="lg:hidden">
        <Header onMenu={() => setOpen(true)} />

        <Drawer
          open={open}
          onClose={() => setOpen(false)}
        >
          <Sidebar
            onNavigate={() => setOpen(false)}
          />
        </Drawer>
      </div>

      <main className="min-h-[calc(100vh-58px)] lg:absolute lg:left-[230px] lg:right-0 lg:top-0 lg:min-h-screen">
        {children}
      </main>
    </div>
  );
}