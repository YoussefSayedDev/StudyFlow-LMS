"use client";
import { cn } from "@/lib/utils";
import { PhoneInput as PhoneField } from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneInputProps {
  id?: string;
  className?: string;
  placeholder?: string;
  field?: any;
}

export default function PhoneInput({
  id,
  className,
  placeholder,
  field,
  ...props
}: PhoneInputProps) {
  return (
    <div>
      <PhoneField
        inputClassName={cn(
          "!flex !h-10 !w-full !rounded-md !border !border-input !bg-background !px-3 !py-2 !text-base !ring-offset-background !file:border-0 !file:bg-transparent !file:text-sm !file:font-medium !file:text-foreground !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-2 !focus-visible:ring-ring !focus-visible:ring-offset-2 !disabled:cursor-not-allowed !disabled:opacity-50 !md:text-sm !text-foreground",
          className,
        )}
        inputProps={{
          id: id || "phone-input",
          placeholder: placeholder || "",
          ...props,
        }}
        {...field}
        defaultCountry="eg"
      />
    </div>
  );
}
