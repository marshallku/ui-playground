"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Input, Typography } from "@marshallku/ui";
import { classNames } from "@marshallku/utils";
import { Button } from "#components";
import styles from "./index.module.scss";

export interface ChatTemplateProps {
    token: string;
    userId: string;
    userName: string;
    chatRoomId: string;
}

const enum ChatMethods {
    Connect = "Connect",
    Error = "Error",
    ReceiveMessage = "ReceiveMessage",
    SendMessage = "SendMessage",
    FetchMessages = "FetchMessages",
}

interface ChatMessage {
    clientId: string;
    userId: string;
    chatRoomId: string;
    name: string;
    text: string;
    createdAt: string;
    customData?: string;
}

const cx = classNames(styles, "chat");

function ChatTemplate({ token, userId, userName, chatRoomId }: ChatTemplateProps) {
    const socket = useMemo(
        () => io(`${process.env.NEXT_PUBLIC_CHAT_SERVER_API_URL}/chat`, { auth: { token } }),
        [token],
    );
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState("");
    const messageListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleError = (message: unknown) => {
            // eslint-disable-next-line no-console
            console.error(message);
        };

        const handleFetchMessage = (messages: ChatMessage[]) => {
            setChatMessages(messages);
        };

        const handleReceiveMessage = (message: ChatMessage) => {
            setChatMessages((prev) => [...prev, message]);
            messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
        };

        socket.on(ChatMethods.Error, handleError);
        socket.on(ChatMethods.FetchMessages, handleFetchMessage);
        socket.on(ChatMethods.ReceiveMessage, handleReceiveMessage);

        socket.emit(ChatMethods.Connect, {
            name: userName,
            chatRoomId,
        });

        return () => {
            socket.off(ChatMethods.Error, handleError);
            socket.off(ChatMethods.FetchMessages, handleFetchMessage);
            socket.off(ChatMethods.ReceiveMessage, handleReceiveMessage);
        };
    }, [chatRoomId, socket, userName]);

    useEffect(() => {
        messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    }, []);

    return (
        <div className={cx()}>
            <ul className={cx("__list")} ref={messageListRef}>
                {chatMessages
                    .filter(({ name }) => name !== "System")
                    .map(({ userId: id, clientId, name, text, createdAt }) => {
                        const mine = id === userId || clientId === socket.id;
                        return (
                            <li key={`${id}-${text}-${createdAt}`} className={cx("-chat", mine && "-chat--mine")}>
                                {!mine && (
                                    <Typography component="span" variant="c1" className={cx("-chat__name")}>
                                        {name}
                                    </Typography>
                                )}
                                <Typography component="span" className={cx("-chat__bubble")}>
                                    {text}
                                </Typography>
                            </li>
                        );
                    })}
            </ul>
            <form
                className={cx("__form")}
                onSubmit={(event) => {
                    event.preventDefault();
                    socket.emit(ChatMethods.SendMessage, {
                        name: userName,
                        text: message,
                        chatRoomId,
                    });
                    setMessage("");
                }}
            >
                <Input
                    value={message}
                    onChange={({ currentTarget: { value } }) => {
                        setMessage(value);
                    }}
                    autoFocus
                />
                <Button type="submit" variant="primary" radius="square">
                    Send
                </Button>
            </form>
        </div>
    );
}

export default ChatTemplate;
