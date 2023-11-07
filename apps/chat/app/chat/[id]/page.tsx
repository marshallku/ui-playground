import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { classNames } from "@marshallku/utils";
import { ChatTemplate } from "#templates";
import styles from "./page.module.scss";

const cx = classNames(styles, "chat");

async function getUserInfo() {
    const token = cookies().get("auth-token")?.value;

    if (!token) {
        redirect("/");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_SERVER_API_URL}/auth/profile`, {
        headers: {
            "Content-Type": "application/json",
            Cookie: cookies().toString(),
        },
        credentials: "include",
        cache: "no-store",
    });
    const data = await response.json();

    return { token, userName: data.username, userId: data.sub };
}

export default async function Home({ params: { id } }: { params: { id: string } }) {
    const { token, userName, userId } = await getUserInfo();

    return (
        <main className={cx()}>
            <ChatTemplate token={token} userName={userName} userId={userId} chatRoomId={id} />
        </main>
    );
}
