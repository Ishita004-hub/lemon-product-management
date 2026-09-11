import type { ProductFormData } from "@/types/product";

export function ProductSummary({
  data,
}: {
  data: ProductFormData;
}) {
  return (
    <pre className="overflow-auto rounded-[8px] bg-[#fafafa] p-4 text-[10px] text-[#555]">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}