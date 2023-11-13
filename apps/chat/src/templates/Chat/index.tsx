"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Input, Typography, useIntersectionObserver } from "@marshallku/ui";
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
    GetPreviousMessages = "GetPreviousMessages",
}

interface ChatMessage {
    _id: string;
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
    const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>();
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState("");
    const canFetchPreviousMessages = useRef<boolean>(false);
    const messageListRef = useRef<HTMLUListElement>(null);
    const firstMessageId = useRef<string | null>(null);

    useEffect(() => {
        const handleError = (message: unknown) => {
            // eslint-disable-next-line no-console
            console.error(message);
        };

        const handleFetchMessage = (messages: ChatMessage[]) => {
            setChatMessages(messages);
            firstMessageId.current = messages[0]._id;
            canFetchPreviousMessages.current = true;
            setTimeout(() => {
                requestAnimationFrame(() => {
                    messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
                });
            });
        };

        const handleReceiveMessage = (message: ChatMessage) => {
            setChatMessages((prev) => [...prev, message]);
            setTimeout(() => {
                requestAnimationFrame(() => {
                    messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
                });
            });
        };

        const handleGetPreviousMessage = (messages: ChatMessage[]) => {
            setChatMessages((prev) => [...messages, ...prev]);

            const hasPreviousMessage = 0 < messages.length;
            canFetchPreviousMessages.current = hasPreviousMessage;

            if (hasPreviousMessage) {
                firstMessageId.current = messages[0]._id;
            }
        };

        socket.on(ChatMethods.Error, handleError);
        socket.on(ChatMethods.FetchMessages, handleFetchMessage);
        socket.on(ChatMethods.ReceiveMessage, handleReceiveMessage);
        socket.on(ChatMethods.GetPreviousMessages, handleGetPreviousMessage);

        socket.emit(ChatMethods.Connect, {
            name: userName,
            chatRoomId,
        });

        return () => {
            socket.off(ChatMethods.Error, handleError);
            socket.off(ChatMethods.FetchMessages, handleFetchMessage);
            socket.off(ChatMethods.ReceiveMessage, handleReceiveMessage);
            socket.off(ChatMethods.GetPreviousMessages, handleGetPreviousMessage);
        };
    }, [chatRoomId, socket, userName]);

    useEffect(() => {
        messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    }, []);

    useEffect(() => {
        if (!canFetchPreviousMessages.current || !isIntersecting) {
            return;
        }

        canFetchPreviousMessages.current = false;
        socket.emit(ChatMethods.GetPreviousMessages, {
            chatRoomId,
            chatId: firstMessageId.current,
        });
    }, [chatRoomId, isIntersecting, socket]);

    return (
        <div className={cx()}>
            <ul className={cx("__list")} ref={messageListRef}>
                <div ref={ref} />
                {chatMessages
                    .filter(({ name }) => name !== "System")
                    .map(({ userId: id, clientId, name, text, _id }) => {
                        const mine = id === userId || clientId === socket.id;
                        return (
                            <li key={_id} className={cx("-chat", mine && "-chat--mine")}>
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
