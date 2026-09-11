import { forwardRef, type InputHTMLAttributes } from "react";
import { cx } from "@/lib/utils";
export const Input=forwardRef<HTMLInputElement,InputHTMLAttributes<HTMLInputElement> & {error?:string}>(({className,error,...props},ref)=><div className="w-full"><input ref={ref} aria-invalid={!!error} className={cx("h-10 w-full rounded-[7px] border bg-white px-3 text-[13px] text-[#222] placeholder:text-[#aaa] transition focus:border-[#168fd5] focus:outline-none",error?"border-[#ef5b5b]":"border-[#dcdfe2]",className)} {...props}/>{error&&<p className="mt-1 text-[11px] text-[#e34f4f]">{error}</p>}</div>);
Input.displayName="Input";
