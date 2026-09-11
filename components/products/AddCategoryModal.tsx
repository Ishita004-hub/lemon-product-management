"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useProductStore } from "@/store/productStore";
export function AddCategoryModal({open,onClose}:{open:boolean;onClose:()=>void}){const [name,setName]=useState("");const [error,setError]=useState("");const addCategory=useProductStore(s=>s.addCategory);const close=()=>{setName("");setError("");onClose()};const submit=(e:React.FormEvent)=>{e.preventDefault();const result=addCategory(name);if(!result.ok){setError(result.error);return;}close()};return <Modal open={open} onClose={close} title="Add category"><form onSubmit={submit} className="mt-5"><label htmlFor="category-name" className="mb-1.5 block text-[10px] font-medium">Category name <span className="text-[#e34f4f]">*</span></label><Input id="category-name" value={name} onChange={e=>{setName(e.target.value);setError("")}} placeholder="T-shirt" error={error}/><div className="mt-3 flex justify-end gap-2"><Button type="button" variant="secondary" size="sm" onClick={close}>Cancel</Button><Button type="submit" size="sm">Save</Button></div></form></Modal>}
