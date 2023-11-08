import { cookies } from "next/headers";
import { ChatRoom } from "#api";
import { ChatRoomList } from "#templates";

async function getChatRoomList(): Promise<ChatRoom[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_SERVER_API_URL}/room/list`, {
        headers: {
            "Content-Type": "application/json",
            Cookie: cookies().toString(),
        },
        credentials: "include",
        cache: "no-store",
    });
    const data = await response.json();

    return data;
}

export default async function List() {
    const data = await getChatRoomList();

    return (
        <main>
            <ChatRoomList data={data} />
        </main>
    );
}

export const dynamic = "force-dynamic";
