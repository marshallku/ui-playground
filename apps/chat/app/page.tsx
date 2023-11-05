"use client";

import { Typography } from "@marshallku/core";
import { Button } from "#components";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <main className={styles.main}>
            <Typography component="h1">Chat app</Typography>
            <div>
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
