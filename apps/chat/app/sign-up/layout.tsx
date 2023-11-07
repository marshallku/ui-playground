import type { Metadata } from "next";
import { GlobalNavigation } from "#components";

export const metadata: Metadata = {
    title: "Sign up",
    description: "You should be logged in for using this service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <GlobalNavigation newTab title="Sign Up" />
            {children}
        </>
    );
}
