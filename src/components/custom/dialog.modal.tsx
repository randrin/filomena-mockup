import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Trash2Icon, Undo2Icon, X } from "lucide-react";
import { MouseEventHandler } from "react";

interface Props {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  position?: "center" | "top";
  cancelText?: string;
  confirmText?: string;
  confirmIcon?: React.ReactNode;
}

const DialogModal = ({
  title,
  description,
  isOpen,
  setIsOpen,
  onConfirm,
  position = "center",
  cancelText = "Annulla",
  confirmText = "Elimina",
  confirmIcon
}: Props) => {
  const IconToShow = confirmIcon ?? <Trash2Icon />;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen} defaultOpen={isOpen}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </AlertDialogTrigger> */}

      <AlertDialogContent
        className={cn(
          "sm:max-w-md transition-all",
          position === "top"
            ? // 💫 slide-in from top animation
              "top-[10%] translate-y-0 data-[state=open]:animate-in data-[state=open]:slide-in-from-top-5 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
            : // 💫 fade-in center animation
              "top-1/2 -translate-y-1/2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        )}
      >
        {/* ❌ Close Icon Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-3 right-3 p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
          aria-label="Chiudi finestra"
        >
          <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
        </button>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(!isOpen)}>
            <Undo2Icon /> {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {IconToShow} {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogModal;
