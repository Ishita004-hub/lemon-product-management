import Link from "next/link";
import { Button } from "@/components/ui/Button";
export function ProductsHeader({onAddCategory}:{onAddCategory:()=>void}){return <div className="flex items-start justify-between gap-4"><div><h1 className="text-[17px] font-bold">Products</h1><p className="mt-1 text-[10px] text-[#999]">Manage your catalogue and product variants.</p></div><div className="flex shrink-0 gap-2"><Button variant="secondary" size="sm" onClick={onAddCategory}>Add Category</Button><Link href="/products/new"><Button size="sm">Add Product</Button></Link></div></div>}
