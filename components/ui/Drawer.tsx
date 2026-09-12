"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function Drawer({
  open,
  onClose,
  children,
  side = "left",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
}) {
  useEffect(() => {
    if (!open) return;

    const f = (e: KeyboardEvent) => e.key === "Escape" && onClose();

    document.addEventListener("keydown", f);

    return () => document.removeEventListener("keydown", f);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/35"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        className={`absolute top-0 h-full w-[290px] max-w-[88vw] bg-white shadow-xl ${
          side === "left" ? "left-0" : "right-0"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-end p-3">
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="rounded p-1 hover:bg-[#f4f4f4]"
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </aside>
    </div>
  );
}
