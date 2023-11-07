export interface CreateChatRoomRequest {
    users: string[];
    name: string;
}

export interface ChatRoom {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    users: string[];
}
