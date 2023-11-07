import type { Metadata } from "next";
import { BottomNavigation, GlobalNavigation } from "#components";

export const metadata: Metadata = {
    title: "Chat room list",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <GlobalNavigation title="Chats" />
            {children}
            <BottomNavigation />
        </>
    );
}
