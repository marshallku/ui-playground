import type { Metadata } from "next";
import { GlobalNavigation } from "#components";

export const metadata: Metadata = {
    title: "Chat",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <GlobalNavigation newTab />
            {children}
        </>
    );
}
