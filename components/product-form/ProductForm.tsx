"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { ProductStepOne } from "@/components/product-form/ProductStepOne";
import { ProductStepTwo } from "@/components/product-form/ProductStepTwo";
import { ProductStepThree } from "@/components/product-form/ProductStepThree";
import { ProductStepFour } from "@/components/product-form/ProductStepFour";
import { AppLayout } from "@/components/layout/AppLayout";
import { useProductStore } from "@/store/productStore";
import { productSchema } from "@/lib/validations";
import { makeId } from "@/lib/utils";

import type { FormStep, Product, ProductFormData } from "@/types/product";

const stepFields: Record<FormStep, (keyof ProductFormData)[]> = {
  0: ["name", "categoryId", "brand"],
  1: ["variants"],
  2: ["combinations"],
  3: ["priceInr", "discount"],
};

export function ProductForm() {
  const router = useRouter();

  const categories = useProductStore((s) => s.categories);
  const addProduct = useProductStore((s) => s.addProduct);

  const [step, setStep] = useState<FormStep>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const defaultCategory = categories[0]?.id ?? "";

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: {
      name: "",
      categoryId: defaultCategory,
      brand: "",
      image: "",
      variants: [{ option: "", values: [] }],
      combinations: [],
      priceInr: 0,
      discount: {
        method: "pct",
        value: 0,
      },
    },
  });

  const { handleSubmit, trigger, setValue, getValues } = methods;

  useEffect(() => {
    if (!getValues("categoryId") && categories[0]) {
      setValue("categoryId", categories[0].id);
    }
  }, [categories, setValue, getValues]);

  const next = async () => {
    setSubmitError("");

    const ok = await trigger(stepFields[step]);

    if (!ok) return;

    if (step < 3) {
      setStep((step + 1) as FormStep);
    }
  };

  const back = () => {
    setSubmitError("");

    if (step > 0) {
      setStep((step - 1) as FormStep);
    } else {
      router.push("/products");
    }
  };

  const submit = handleSubmit(
    async (data) => {
      setSubmitError("");

      const skus = data.combinations.map((c) => c.sku.trim().toLowerCase());

      if (new Set(skus).size !== skus.length) {
        setSubmitError("Each combination must have a unique SKU.");
        setStep(2);
        return;
      }

      if (data.discount.method === "pct" && data.discount.value > 100) {
        setSubmitError("Percentage discount cannot exceed 100%.");
        return;
      }

      setSubmitting(true);

      await new Promise((r) => setTimeout(r, 250));

      const product: Product = {
        id: makeId(),
        name: data.name.trim(),
        categoryId: data.categoryId,
        brand: data.brand.trim(),
        image: data.image,
        variants: data.variants.map((v) => ({
          option: v.option.trim(),
          values: v.values.map((x) => x.trim()).filter(Boolean),
        })),
        combinations: data.combinations,
        priceInr: data.priceInr,
        discount: data.discount.value ? data.discount : undefined,
      };

      addProduct(product);
      router.push("/products");
    },
    () => {
      setSubmitError("Please complete the required fields before confirming.");
    },
  );

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <div className="mx-auto max-w-[1180px] p-5 sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-[17px] font-bold">Add Product</h1>

              <div className="mt-3">
                <StepIndicator current={step} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={back}>
                {step === 0 ? "Cancel" : "Back"}
              </Button>

              {step < 3 ? (
                <Button size="sm" onClick={next}>
                  Next
                </Button>
              ) : (
                <Button size="sm" disabled={submitting} onClick={submit}>
                  {submitting ? "Creating…" : "Confirm"}
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6">
            {step === 0 && <ProductStepOne />}
            {step === 1 && <ProductStepTwo />}
            {step === 2 && <ProductStepThree />}
            {step === 3 && <ProductStepFour />}
          </div>

          {submitError && (
            <div
              role="alert"
              className="mt-4 max-w-[650px] rounded-[7px] border border-[#f2b7b7] bg-[#fff6f6] px-3 py-2 text-[11px] text-[#d84b4b]"
            >
              {submitError}
            </div>
          )}
        </div>
      </AppLayout>
    </FormProvider>
  );
}
