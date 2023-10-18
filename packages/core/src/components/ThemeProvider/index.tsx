import { ReactNode } from "react";
import { ThemeProvider as Provider } from "next-themes";
import { THEME_STORAGE_KEY, Theme } from "#constants";

export interface ThemeProviderProps {
    children?: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <Provider storageKey={THEME_STORAGE_KEY} themes={[Theme.LIGHT, Theme.DARK]}>
            {children}
        </Provider>
    );
}
