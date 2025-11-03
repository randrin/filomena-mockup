import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertType = "info" | "success" | "warning" | "error";

interface AlertMessageProps {
  type: AlertType;
  title?: string;
  description?: string;
  className?: string;
}

const iconMap = {
  info: <Info className="h-4 w-4 text-blue-500" />,
  success: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  error: <XCircle className="h-4 w-4 text-red-500" />
};

const styleMap: Record<AlertType, string> = {
  info: "border-blue-300 text-blue-700 bg-blue-50",
  success: "border-green-300 text-green-700 bg-green-50",
  warning: "border-yellow-300 text-yellow-700 bg-yellow-50",
  error: "border-red-300 text-red-700 bg-red-50"
};

export const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  title,
  description,
  className
}) => {
  return (
    <Alert
      className={cn(
        "flex items-start space-x-3 border p-4 rounded-md",
        styleMap[type],
        className
      )}
      role="alert"
    >
      <div className="pt-0.5">{iconMap[type]}</div>
      <div>
        {title && <AlertTitle className="font-semibold">{title}</AlertTitle>}
        {description && (
          <AlertDescription className="text-sm text-inherit">
            {description}
          </AlertDescription>
        )}
      </div>
    </Alert>
  );
};
