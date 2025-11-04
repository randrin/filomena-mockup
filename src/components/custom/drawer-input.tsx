import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X, XIcon } from "lucide-react";

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position?: "left" | "right" | "top" | "bottom";
  title?: string;
  children?: React.ReactNode;
}
const DrawerInput = ({
  open,
  setOpen,
  position,
  title,
  children
}: DrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent position={position}>
        <DrawerHeader>
          <DrawerTitle className="flex items-center">
            <span>{title}</span>
            <Button
              variant="link"
              className="ml-auto cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <XIcon className="size-6" />
            </Button>
          </DrawerTitle>
        </DrawerHeader>
        {children}
        <DrawerFooter>
          <Button onClick={() => setOpen(false)}>
            <X /> Chuidi
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerInput;
