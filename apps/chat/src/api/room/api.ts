import { CommonApiError } from "#api";
import { ChatRoom, CreateChatRoomRequest } from "./types";

export async function createChatRoom(requestBody: CreateChatRoomRequest): Promise<ChatRoom | CommonApiError> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_SERVER_API_URL}/room/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
    });
    const data = await response.json();

    return data;
}
