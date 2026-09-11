"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
export function Modal({open,onClose,title,children}:{open:boolean;onClose:()=>void;title:string;children:React.ReactNode}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!open)return; const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")onClose();}; document.addEventListener("keydown",onKey); const first=ref.current?.querySelector<HTMLElement>("input,button"); first?.focus(); return()=>document.removeEventListener("keydown",onKey)},[open,onClose]);
 if(!open)return null;
 return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4" role="dialog" aria-modal="true" aria-label={title} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div ref={ref} className="animate-slide-in w-full max-w-[560px] rounded-[12px] bg-white p-4 shadow-2xl sm:p-5"><div className="flex items-center justify-between"><h2 className="text-[16px] font-bold">{title}</h2><button aria-label="Close dialog" onClick={onClose} className="rounded p-1 text-[#777] hover:bg-[#f3f3f3]"><X size={17}/></button></div>{children}</div></div>;
}
