import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
}

export function PasswordInput({
  id,
  label,
  error,
  className,
  ...props
}: PasswordInputProps) {
  const [show, setShow] = React.useState(false);

  return (
    <div className="space-y-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        {/* Left icon */}
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

        {/* Password input */}
        <Input
          type={show ? "text" : "password"}
          className={cn("pl-9 pr-10", className)}
          {...props}
        />

        {/* Toggle icon */}
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          tabIndex={-1}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
