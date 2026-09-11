import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
export const Select=forwardRef<HTMLSelectElement,SelectHTMLAttributes<HTMLSelectElement> & {error?:string}>(({error,className,...props},ref)=><div className="w-full"><div className="relative"><select ref={ref} aria-invalid={!!error} className={`h-10 w-full appearance-none rounded-[7px] border bg-white px-3 pr-9 text-[13px] outline-none transition focus:border-[#168fd5] ${error?"border-[#ef5b5b]":"border-[#dcdfe2]"} ${className??""}`} {...props}/><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#168fd5]"/></div>{error&&<p className="mt-1 text-[11px] text-[#e34f4f]">{error}</p>}</div>);
Select.displayName="Select";
