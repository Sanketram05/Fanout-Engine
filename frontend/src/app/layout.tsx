import Navbar from "@/components/layout/Navbar";
import "./globals.css";

import QueryProvider from "@/providers/query-provider";
import AppThemeProvider from "@/providers/theme-provider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>

                <AppThemeProvider>

                    <QueryProvider>
                        <Navbar/>
                        {children}

                    </QueryProvider>

                </AppThemeProvider>

            </body>
        </html>
    );
}