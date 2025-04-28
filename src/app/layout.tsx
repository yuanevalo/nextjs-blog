import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import theme from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </head>
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "100vh",
                        }}
                    >
                        <Navbar />
                        <div className="h-screen mt-28">{children}</div>
                        <Footer />
                    </Box>
                </ThemeProvider>
            </body>
        </html>
    );
}
