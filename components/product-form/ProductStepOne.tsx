"use client";

import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Upload } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { ProductFormData } from "@/types/product";
import { useProductStore } from "@/store/productStore";

export function ProductStepOne() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const categories = useProductStore((s) => s.categories);
  const image = watch("image");

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () =>
      setValue(
        "image",
        String(reader.result),
        {
          shouldDirty: true,
        }
      );

    reader.readAsDataURL(file);
  };

  return (
    <section className="max-w-[530px] rounded-[10px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,.06)]">
      <h2 className="mb-5 text-[13px] font-bold">
        Description
      </h2>

      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-[10px] font-medium"
          >
            Product name{" "}
            <span className="text-[#e34f4f]">*</span>
          </label>

          <Input
            id="name"
            placeholder="Nike Air Jordan"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-1.5 block text-[10px] font-medium"
          >
            Category{" "}
            <span className="text-[#e34f4f]">*</span>
          </label>

          <Select
            id="category"
            {...register("categoryId")}
            error={errors.categoryId?.message}
          >
            {categories.length ? (
              categories.map((c) => (
                <option
                  key={c.id}
                  value={c.id}
                >
                  {c.name}
                </option>
              ))
            ) : (
              <option value="">
                No categories available
              </option>
            )}
          </Select>
        </div>

        {/* Brand */}
        <div>
          <label
            htmlFor="brand"
            className="mb-1.5 block text-[10px] font-medium"
          >
            Brand{" "}
            <span className="text-[#e34f4f]">*</span>
          </label>

          <Input
            id="brand"
            placeholder="Nike"
            {...register("brand")}
            error={errors.brand?.message}
          />
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-3">
          <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-[6px] border border-[#168fd5] px-3 text-[11px] font-semibold text-[#168fd5] hover:bg-[#eff9ff]">
            <Upload size={13} />

            {image
              ? "Change Image"
              : "Upload Image"}

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={handleFile}
            />
          </label>

          {image && (
            <Image
              src={image}
              alt="Selected product preview"
              width={40}
              height={40}
              unoptimized
              className="h-10 w-10 rounded object-contain"
            />
          )}

          <p className="text-[9px] text-[#aaa]">
            PNG/JPG/WebP · max 2MB
          </p>
        </div>
      </div>
    </section>
  );
}