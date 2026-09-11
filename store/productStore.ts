"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialCategories } from "@/data/categories";
import { initialProducts } from "@/data/products";
import type { Category, Product } from "@/types/product";
import { makeId } from "@/lib/utils";

type ProductStore = {
  categories:Category[]; products:Product[];
  addCategory:(name:string)=>{ok:true;category:Category}|{ok:false;error:string};
  addProduct:(product:Product)=>void;
};

export const useProductStore = create<ProductStore>()(persist((set,get)=>({
  categories:initialCategories, products:initialProducts,
  addCategory:(raw)=>{
    const name=raw.trim();
    if(!name) return {ok:false,error:"Category name is required"};
    if(get().categories.some(c=>c.name.toLowerCase()===name.toLowerCase())) return {ok:false,error:"A category with this name already exists"};
    const category={id:makeId(),name}; set(state=>({categories:[...state.categories,category]})); return {ok:true,category};
  },
  addProduct:(product)=>set(state=>({products:[...state.products,product]})),
}),{name:"lemon-product-store",version:1,partialize:state=>({categories:state.categories,products:state.products})}));
