"use client";

import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import { Plus, Trash2, X } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { ProductFormData } from "@/types/product";

export function ProductStepTwo() {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const variants = watch("variants");

  const updateValues = (
    index: number,
    value: string
  ) => {
    const values = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    setValue(
      `variants.${index}.values`,
      values,
      {
        shouldDirty: true,
        shouldValidate: false,
      }
    );
  };

  return (
    <section className="max-w-[640px] rounded-[10px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,.06)]">
      <h2 className="mb-5 text-[13px] font-bold">
        Variants
      </h2>

      <div className="grid grid-cols-[minmax(110px,1fr)_minmax(200px,2fr)_22px] gap-2 text-[10px] font-medium">
        <span>
          Option <b className="text-[#e34f4f]">*</b>
        </span>

        <span>
          Values <b className="text-[#e34f4f]">*</b>
        </span>

        <span />
      </div>

      <div className="mt-2 space-y-2">
        {fields.map((field, index) => {
          const valueError =
            errors.variants?.[index]?.values?.message;

          const optionError =
            errors.variants?.[index]?.option?.message;

          return (
            <div
              key={field.id}
              className="grid grid-cols-[minmax(110px,1fr)_minmax(200px,2fr)_22px] items-start gap-2"
            >
              <div>
                <Input
                  placeholder="Size"
                  {...register(
                    `variants.${index}.option`
                  )}
                  error={optionError}
                />
              </div>

              <div>
                <div
                  className={`min-h-10 rounded-[7px] border bg-white px-2 py-1 focus-within:border-[#168fd5] ${
                    valueError
                      ? "border-[#ef5b5b]"
                      : "border-[#dcdfe2]"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-1">
                    <input
                      aria-label={`Values for ${
                        variants[index]?.option ||
                        `option ${index + 1}`
                      }`}
                      className="min-w-[90px] flex-1 border-0 bg-transparent px-1 py-1 text-[12px] outline-none"
                      placeholder="M, L"
                      value={(
                        variants[index]?.values ?? []
                      ).join(", ")}
                      onChange={(e) =>
                        updateValues(
                          index,
                          e.target.value
                        )
                      }
                      onBlur={() =>
                        updateValues(
                          index,
                          (
                            variants[index]?.values ??
                            []
                          ).join(", ")
                        )
                      }
                    />
                  </div>
                </div>

                {valueError && (
                  <p className="mt-1 text-[11px] text-[#e34f4f]">
                    {valueError}
                  </p>
                )}
              </div>

              <button
                type="button"
                aria-label={`Delete ${
                  variants[index]?.option || "variant"
                }`}
                onClick={() => remove(index)}
                className="mt-2 rounded p-1 text-[#ef4b4b] hover:bg-red-50"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {errors.variants?.message && (
        <p className="mt-2 text-[11px] text-[#e34f4f]">
          {errors.variants.message}
        </p>
      )}

      <button
        type="button"
        onClick={() =>
          append({
            option: "",
            values: [],
          })
        }
        className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-[#168fd5] hover:underline"
      >
        <Plus size={13} />
        Add Option
      </button>

      <div className="mt-5 rounded-[7px] bg-[#f7f7f7] p-3 text-[10px] text-[#777]">
        <p className="font-semibold text-[#444]">
          Tip
        </p>

        <p className="mt-1">
          Add values separated by commas. For example:{" "}
          <span className="font-medium">
            M, L, XL
          </span>
          .
        </p>
      </div>
    </section>
  );
}