import { ThemeProvider } from "@/components/providers/theme.provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Component {...pageProps} />
        <Toaster expand={true} richColors />
      </TooltipProvider>
    </ThemeProvider>
  );
}
