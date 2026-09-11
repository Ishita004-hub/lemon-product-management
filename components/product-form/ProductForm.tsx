"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import type { ProductFormData } from "@/types/product";

import { ProductStepOne } from "./ProductStepOne";
import { ProductStepTwo } from "./ProductStepTwo";
import { ProductStepThree } from "./ProductStepThree";
import { ProductStepFour } from "./ProductStepFour";

export function ProductForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const methods = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      categoryId: "",
      brand: "",
      image: "",
      variants: [],
      combinations: [],
      priceInr: 0,
      discount: {
        method: "pct",
        value: 0,
      },
    },
  });

  const { handleSubmit, trigger } = methods;

  const nextStep = async () => {
    let fieldsToValidate: (keyof ProductFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["name", "categoryId", "brand"];
    } else if (step === 2) {
      fieldsToValidate = ["variants"];
    } else if (step === 3) {
      fieldsToValidate = ["combinations"];
    } else if (step === 4) {
      fieldsToValidate = ["priceInr"];
    }

    const valid = await trigger(fieldsToValidate);

    if (!valid) {
      return;
    }

    if (step < 4) {
      setStep((current) => current + 1);
    }
  };

  const previousStep = () => {
    if (step === 1) {
      router.push("/products");
      return;
    }

    setStep((current) => current - 1);
  };

  const onSubmit = (data: ProductFormData) => {
    console.log("Product submitted:", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >
        {/* CENTERED FORM CONTENT */}
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center px-4 sm:px-6">
          {/* STEP CONTENT */}
          <div className="flex w-full justify-center">
            {step === 1 && <ProductStepOne />}

            {step === 2 && <ProductStepTwo />}

            {step === 3 && <ProductStepThree />}

            {step === 4 && <ProductStepFour />}
          </div>

          {/* BACK / NEXT BUTTONS */}
          <div className="mt-6 flex items-center justify-center gap-4">
            {/* BACK BUTTON */}
            <button
              type="button"
              onClick={previousStep}
              className="rounded-lg border border-[#dcdfe2] bg-white px-5 py-2 text-sm text-[#555] transition hover:bg-[#f7f7f7]"
            >
              Back
            </button>

            {/* NEXT / CREATE BUTTON */}
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-lg bg-[#168fd5] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#117fbd]"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-lg bg-[#168fd5] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#117fbd]"
              >
                Create Product
              </button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}