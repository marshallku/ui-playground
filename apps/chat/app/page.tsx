import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Typography } from "@marshallku/ui";
import { classNames } from "@marshallku/utils";
import { Button, GlobalNavigation } from "#components";
import styles from "./page.module.scss";

const cx = classNames(styles, "home");

async function getUserData() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_SERVER_API_URL}/auth/status`, {
        headers: {
            "Content-Type": "application/json",
            Cookie: cookies().toString(),
        },
        credentials: "include",
        cache: "no-store",
    });
    const data = await response.json();

    if (data.username) {
        redirect("/home");
    }

    return data;
}

export default async function Home() {
    // FIXME: Check if user is logged in - in right way
    await getUserData();

    return (
        <>
            <GlobalNavigation />
            <main className={cx()}>
                <Typography variant="h1" component="h1" fontWeight={700} marginBottom={12} className={cx("__title")}>
                    Chat app
                </Typography>
                <Typography marginBottom={24}>
                    ⚠️ Note: This application is extremely experimental. Your data might be deleted at any time.
                </Typography>
                <div className={cx("__buttons")}>
                    <Button href="/login" size="large" horizontalResizing="fill" variant="primary">
                        Login
                    </Button>
                    <Button href="/sign-up" size="large" horizontalResizing="fill">
                        Sign up
                    </Button>
                </div>
            </main>
        </>
    );
}
