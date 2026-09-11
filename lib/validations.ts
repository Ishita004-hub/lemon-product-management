import { z } from "zod";

export const variantSchema = z.object({
  option:z.string().trim().min(1,"Option is required").max(40,"Option is too long"),
  values:z.array(z.string().trim().min(1,"Value is required").max(30,"Value is too long")).min(1,"Add at least one value"),
});
export const combinationSchema = z.object({ id:z.string(), name:z.string().min(1), sku:z.string().trim().min(1,"SKU is required").max(40), quantity:z.number().int().min(0,"Quantity cannot be negative"), inStock:z.boolean() });
export const productSchema = z.object({
  name:z.string().trim().min(2,"Product name is required").max(80,"Product name is too long"),
  categoryId:z.string().min(1,"Category is required"),
  brand:z.string().trim().min(2,"Brand is required").max(60,"Brand is too long"),
  image:z.string().optional(),
  variants:z.array(variantSchema).min(1,"Add at least one variant option"),
  combinations:z.array(combinationSchema).min(1,"Add at least one combination"),
  priceInr:z.number().positive("Price must be greater than 0"),
  discount:z.object({method:z.enum(["pct","flat"]),value:z.number().min(0,"Discount cannot be negative")}),
});
