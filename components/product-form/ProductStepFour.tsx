"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/Input";
import type { ProductFormData } from "@/types/product";
import { formatInr } from "@/lib/utils";

export function ProductStepFour() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const data = watch();

  return (
    <div className="grid max-w-[900px] gap-4 lg:grid-cols-[452px_1fr]">
      <section className="rounded-[10px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,.06)]">
        <h2 className="mb-5 text-[13px] font-bold">
          Price Info
        </h2>

        <div>
          <label
            htmlFor="price"
            className="mb-1.5 block text-[10px] font-medium"
          >
            Price{" "}
            <span className="text-[#e34f4f]">*</span>
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px]">
              ₹
            </span>

            <Input
              id="price"
              type="number"
              min="1"
              className="pl-7"
              {...register("priceInr", {
                valueAsNumber: true,
              })}
              error={errors.priceInr?.message}
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="discount"
            className="mb-1.5 block text-[10px] font-medium"
          >
            Discount
          </label>

          <div className="flex gap-2">
            <Input
              id="discount"
              type="number"
              min="0"
              {...register("discount.value", {
                valueAsNumber: true,
              })}
              error={errors.discount?.value?.message}
            />

            <div className="flex h-10 overflow-hidden rounded-[7px] border border-[#dcdfe2]">
              <button
                type="button"
                onClick={() =>
                  setValue("discount.method", "pct")
                }
                className={`w-10 text-[12px] ${
                  watch("discount.method") === "pct"
                    ? "bg-[#edf2f5] font-semibold"
                    : "bg-white"
                }`}
              >
                %
              </button>

              <button
                type="button"
                onClick={() =>
                  setValue("discount.method", "flat")
                }
                className={`w-10 text-[12px] ${
                  watch("discount.method") === "flat"
                    ? "bg-[#edf2f5] font-semibold"
                    : "bg-white"
                }`}
              >
                ₹
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[10px] border border-[#ededed] bg-[#fafafa] p-4">
        <h2 className="text-[13px] font-bold">
          Review
        </h2>

        <dl className="mt-4 space-y-2 text-[11px]">
          <div className="flex justify-between gap-4">
            <dt className="text-[#888]">
              Product
            </dt>

            <dd className="font-medium">
              {data.name || "—"}
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt className="text-[#888]">
              Brand
            </dt>

            <dd>
              {data.brand || "—"}
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt className="text-[#888]">
              Variants
            </dt>

            <dd>
              {data.variants
                .filter((v) => v.option)
                .map((v) => v.option)
                .join(", ") || "—"}
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt className="text-[#888]">
              Combinations
            </dt>

            <dd>
              {data.combinations.length}
            </dd>
          </div>

          <div className="flex justify-between gap-4 border-t border-[#e6e6e6] pt-2">
            <dt className="font-medium">
              Price
            </dt>

            <dd className="font-bold">
              {data.priceInr
                ? formatInr(data.priceInr)
                : "—"}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}