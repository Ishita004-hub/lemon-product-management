import { cx } from "@/lib/utils";
const steps=["Description","Variants","Combinations","Price info"];
export function StepIndicator({current}:{current:number}){return <nav aria-label="Product creation steps" className="flex flex-wrap items-center gap-y-2 text-[11px]">{steps.map((s,i)=><div key={s} className="flex items-center"><span className={cx("rounded-[6px] px-3 py-1.5",i===current?"bg-[#dff1fc] font-semibold text-[#168fd5]":"text-[#777]")}>{s}</span>{i<steps.length-1&&<span className="mx-2 text-[#999]">›</span>}</div>)}</nav>}
