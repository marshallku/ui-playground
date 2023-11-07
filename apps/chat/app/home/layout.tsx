import type { Metadata } from "next";
import { BottomNavigation, GlobalNavigation } from "#components";

export const metadata: Metadata = {
    title: "Home",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <GlobalNavigation title="Home" />
            {children}
            <BottomNavigation />
        </>
    );
}
