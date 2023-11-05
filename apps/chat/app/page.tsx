"use client";

import { Typography } from "@marshallku/core";
import { classNames } from "@marshallku/utils";
import { Button } from "#components";
import styles from "./page.module.scss";

const cx = classNames(styles, "home");

export default function Home() {
    return (
        <main className={cx()}>
            <Typography variant="h1" component="h1" fontWeight={700} marginBottom={24} className={cx("__title")}>
                Chat app
            </Typography>
            <div className={cx("__buttons")}>
                <Button href="/login" size="large" horizontalResizing="fill" variant="primary">
                    Login
                </Button>
                <Button href="/sign-up" size="large" horizontalResizing="fill">
                    Sign up
                </Button>
            </div>
        </main>
    );
}
