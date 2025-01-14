import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { Input } from "./ui/input";

interface PasswordInputProps extends React.ComponentProps<"input"> {
  dir?: "ltr" | "rtl";
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, dir = "ltr", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isRTL = dir === "rtl";

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pe-16", className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-md bg-muted px-2 py-1 text-muted-foreground shadow-sm ring-1 ring-muted/30 hover:bg-muted/40 focus:outline-none",
            isRTL ? "left-2" : "right-2",
          )}
          onClick={() => setShowPassword((prev) => !prev)}
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
