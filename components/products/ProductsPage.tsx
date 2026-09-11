"use client";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { CategorySection } from "@/components/products/CategorySection";
import { AddCategoryModal } from "@/components/products/AddCategoryModal";
import { useProductStore } from "@/store/productStore";
export function ProductsPage(){const [modal,setModal]=useState(false);const [hydrated,setHydrated]=useState(false);const {categories,products}=useProductStore();useEffect(()=>setHydrated(true),[]);return <AppLayout><div className="mx-auto max-w-[1180px] p-5 sm:p-7 lg:p-8"><ProductsHeader onAddCategory={()=>setModal(true)}/><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{hydrated?categories.map(c=><CategorySection key={c.id} category={c} products={products.filter(p=>p.categoryId===c.id)}/>):null}</div>{hydrated&&!categories.length&&<div className="mt-6 rounded-[8px] border border-dashed border-[#dcdcdc] p-16 text-center"><p className="font-semibold">No categories yet</p><p className="mt-1 text-xs text-[#999]">Create a category to get started.</p></div>}</div><AddCategoryModal open={modal} onClose={()=>setModal(false)}/></AppLayout>}
