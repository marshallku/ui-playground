import { ChatRoom, request } from "#api";
import { ChatRoomList } from "#templates";

function getChatRoomList(): Promise<ChatRoom[]> {
    return request<ChatRoom[]>("/room/list");
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
