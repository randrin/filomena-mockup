import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface Prop {
  trigger: React.ReactNode;
  content: string;
}
const TooltipMessage = ({ trigger, content }: Prop) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild className="cursor-pointer">{trigger}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipMessage;
