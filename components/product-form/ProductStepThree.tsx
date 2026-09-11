"use client";

import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

import { Input } from "@/components/ui/Input";
import { cx } from "@/lib/utils";
import { generateCombinations } from "@/lib/combinations";
import type { ProductFormData } from "@/types/product";

export function ProductStepThree() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const variants = watch("variants");
  const combinations = watch("combinations");

  useEffect(() => {
    const next = generateCombinations(
      variants,
      combinations
    );

    if (
      JSON.stringify(next) !==
      JSON.stringify(combinations)
    ) {
      setValue("combinations", next, {
        shouldDirty: true,
      });
    }
  }, [variants, combinations, setValue]);

  const duplicateSkus = new Set(
    combinations
      .map((c) => c.sku.trim().toLowerCase())
      .filter(Boolean)
      .filter(
        (sku, _, arr) =>
          arr.filter((v) => v === sku).length > 1
      )
  );

  return (
    <section className="max-w-[650px] rounded-[10px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,.06)]">
      <h2 className="mb-5 text-[13px] font-bold">
        Combinations
      </h2>

      {/* Table Header */}
      <div className="grid grid-cols-[minmax(70px,1fr)_130px_65px_80px] gap-2 px-1 text-[10px] font-medium">
        <span />

        <span>
          SKU <b className="text-[#e34f4f]">*</b>
        </span>

        <span>In stock</span>

        <span>Quantity</span>
      </div>

      {/* Combinations */}
      <div className="mt-2 space-y-2">
        {combinations.map((row, index) => {
          const skuError =
            errors.combinations?.[index]?.sku?.message;

          const duplicate = duplicateSkus.has(
            row.sku.trim().toLowerCase()
          );

          return (
            <div
              key={row.id}
              className="grid grid-cols-[minmax(70px,1fr)_130px_65px_80px] items-start gap-2"
            >
              {/* Combination Name */}
              <span className="pt-3 text-[10px] font-medium">
                {row.name}
              </span>

              {/* SKU */}
              <div>
                <Input
                  aria-label={`SKU for ${row.name}`}
                  value={row.sku}
                  onChange={(e) =>
                    setValue(
                      `combinations.${index}.sku`,
                      e.target.value,
                      {
                        shouldDirty: true,
                      }
                    )
                  }
                  error={
                    duplicate
                      ? "Duplicate SKU"
                      : skuError
                  }
                />
              </div>

              {/* In Stock */}
              <label className="mt-2 inline-flex items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={row.inStock}
                  onChange={(e) =>
                    setValue(
                      `combinations.${index}.inStock`,
                      e.target.checked,
                      {
                        shouldDirty: true,
                      }
                    )
                  }
                />

                <span
                  className={cx(
                    "relative h-5 w-9 rounded-full transition",
                    row.inStock
                      ? "bg-[#151f3d]"
                      : "bg-[#e8edf2]"
                  )}
                >
                  <span
                    className={cx(
                      "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition",
                      row.inStock
                        ? "left-[18px]"
                        : "left-0.5"
                    )}
                  />
                </span>
              </label>

              {/* Quantity */}
              <Input
                aria-label={`Quantity for ${row.name}`}
                type="number"
                min={0}
                value={row.quantity}
                onChange={(e) =>
                  setValue(
                    `combinations.${index}.quantity`,
                    Number(e.target.value),
                    {
                      shouldDirty: true,
                    }
                  )
                }
              />
            </div>
          );
        })}
      </div>

      {/* General Error */}
      {errors.combinations?.message && (
        <p className="mt-2 text-[11px] text-[#e34f4f]">
          {errors.combinations.message}
        </p>
      )}

      {/* Helper Text */}
      <p className="mt-4 text-[10px] text-[#999]">
        Each unique variant combination receives its own SKU
        and stock quantity.
      </p>
    </section>
  );
}