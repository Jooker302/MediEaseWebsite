"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
     
  );
}
