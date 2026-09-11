export interface Category { id:string; name:string; }
export interface ProductVariant { option:string; values:string[]; }
export interface ProductCombination { id:string; name:string; sku:string; quantity:number; inStock:boolean; }
export interface ProductDiscount { method:"pct"|"flat"; value:number; }
export interface Product {
  id:string; name:string; categoryId:string; brand:string; image?:string;
  variants:ProductVariant[]; combinations:ProductCombination[]; priceInr:number; discount?:ProductDiscount;
}
export interface ProductFormData {
  name:string; categoryId:string; brand:string; image?:string;
  variants:ProductVariant[]; combinations:ProductCombination[]; priceInr:number;
  discount:{method:"pct"|"flat"; value:number};
}
export type FormStep = 0|1|2|3;
