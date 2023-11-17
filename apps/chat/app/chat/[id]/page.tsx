import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { classNames } from "@marshallku/utils";
import { AuthStatusResponse, request } from "#api";
import { ChatTemplate } from "#templates";
import styles from "./page.module.scss";

const cx = classNames(styles, "chat");

async function getUserInfo() {
    const token = cookies().get("auth-token")?.value;

    if (!token) {
        redirect("/");
    }

    const data = await request<AuthStatusResponse>("/auth/status");

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

export const dynamic = "force-dynamic";
