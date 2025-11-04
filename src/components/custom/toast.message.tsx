import { toast } from "sonner";

interface Prop {
  message: string;
  type?: "success" | "error" | "info" | "warning" | "promise";
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  duration?: number;
}
const ToastMessage = ({
  message,
  type = "success",
  position = "top-center",
  duration = 4000
}: Prop) => {
  const opts = { position, duration, ex: true };
  if (type === "promise") {
    toast.promise(Promise.resolve(), {
      loading: "Loading...",
      success: message,
      error: "Something went wrong",
      ...opts
    });
  } else {
    return toast[type]?.(message, opts);
  }
};

export default ToastMessage;
