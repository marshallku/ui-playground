"use client";

import { ThemeProvider } from "@marshallku/ui";
import { ReactNode, useEffect, useState } from "react";

interface ProviderProps {
    children?: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // for persistent theme page.
    if (!mounted) {
        return <></>;
    }

    return <ThemeProvider>{children}</ThemeProvider>;
}
