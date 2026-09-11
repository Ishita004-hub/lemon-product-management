import type { ProductCombination, ProductVariant } from "@/types/product";
import { makeId } from "@/lib/utils";

export function generateCombinations(variants:ProductVariant[], existing:ProductCombination[] = []):ProductCombination[] {
  const valid = variants.filter(v => v.option.trim() && v.values.length);
  if (!valid.length) return [];
  const rows = valid.reduce<string[][]>((acc, variant) => acc.flatMap(prefix => variant.values.map(value => [...prefix,value])), [[]]);
  return rows.map(parts => {
    const name = parts.join("/");
    const previous = existing.find(item => item.name === name);
    return previous ?? { id:makeId(), name, sku:"", quantity:0, inStock:false };
  });
}
