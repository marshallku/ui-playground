"use client";

import { classNames } from "@marshallku/utils";
import { User } from "#api";
import { Button } from "#components";
import styles from "./index.module.scss";
import { Typography } from "@marshallku/core";

export interface HomeTemplateProps {
    data: User[];
}

const cx = classNames(styles, "home");

function HomeTemplate({ data }: HomeTemplateProps) {
    return (
        <div className={cx()}>
            {data.map(({ _id, name, createdAt }) => (
                <Button
                    key={_id}
                    variant="base"
                    horizontalResizing="fill"
                    className={cx("__user")}
                    onClick={async () => {
                        if (!confirm(`Do you want to chat with ${name}?`)) {
                            return;
                        }
                    }}
                >
                    <Typography component="p" fontWeight={500} marginBottom={4}>
                        {name}
                    </Typography>
                    <Typography variant="c1" component="time" dateTime={createdAt}>
                        Joined at: {new Date(createdAt).toLocaleDateString()}
                    </Typography>
                </Button>
            ))}
        </div>
    );
}

export default HomeTemplate;
