"use client";
import { Menu, Bell } from "lucide-react";
export function Header({onMenu}:{onMenu:()=>void}){return <header className="flex h-[58px] items-center justify-between border-b border-[#ededed] bg-white px-4 lg:hidden"><div className="flex items-center gap-3"><button aria-label="Open navigation" onClick={onMenu} className="rounded p-2 hover:bg-[#f5f5f5]"><Menu size={20}/></button><span className="font-bold">Lemon Inc.</span></div><button aria-label="Notifications" className="rounded p-2 hover:bg-[#f5f5f5]"><Bell size={17}/></button></header>}
