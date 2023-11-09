"use client";

import { classNames } from "@marshallku/utils";
import { ChatRoom } from "#api";
import { Button } from "#components";
import styles from "./index.module.scss";
import { Typography } from "@marshallku/ui";

export interface ChatRoomListProps {
    data: ChatRoom[];
}

const cx = classNames(styles, "chat-room-list");

function ChatRoomList({ data }: ChatRoomListProps) {
    return (
        <div className={cx()}>
            {data.length === 0 ? (
                <Typography>You&apos;re not currently in any room.</Typography>
            ) : (
                data.map(({ _id, name, updatedAt }) => (
                    <Button
                        key={_id}
                        variant="base"
                        horizontalResizing="fill"
                        className={cx("__room")}
                        href={`/chat/${_id}`}
                    >
                        <Typography component="p" fontWeight={500} marginBottom={4}>
                            {name}
                        </Typography>
                        <Typography variant="c1" component="time" dateTime={updatedAt}>
                            Updated at: {new Date(updatedAt).toLocaleDateString()}
                        </Typography>
                    </Button>
                ))
            )}
        </div>
    );
}

export default ChatRoomList;
