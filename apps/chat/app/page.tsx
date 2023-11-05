"use client";

import Link from "next/link";
import { Button, Typography } from "@marshallku/core";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <main className={styles.main}>
            <Typography component="h1">Chat app</Typography>
            <div>
                <Button component={Link} href="/login" size="large" horizontalResizing="fill" variant="primary">
                    Login
                </Button>
                <Button component={Link} href="/sign-up" size="large" horizontalResizing="fill">
                    Sign up
                </Button>
            </div>
        </main>
    );
}
