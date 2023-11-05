import "@marshallku/core/dist/reset.css";
import "@marshallku/core/dist/palette.css";
import "./globals.css";

import type { Metadata } from "next";
import Head from "next/head";
import { GlobalNavigation } from "#components";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Head>
                <link
                    rel="stylesheet"
                    as="style"
                    crossOrigin=""
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css"
                />
            </Head>
            <body>
                <GlobalNavigation />
                {children}
            </body>
        </html>
    );
}
