"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@marshallku/core";
import { classNames } from "@marshallku/utils";
import { Logo } from "#components";
import styles from "./index.module.scss";

export interface GlobalNavigationProps {
    /** title of current page */
    title?: string;
    /** determines style of navigation */
    newTab?: boolean;
}

const cx = classNames(styles, "global-navigation");

function GlobalNavigation({ title, newTab }: GlobalNavigationProps) {
    const router = useRouter();

    return (
        <nav className={cx()}>
            {newTab ? (
                <Button
                    onClick={() => {
                        router.back();
                    }}
                    variant="text"
                >
                    {/* FIXME: Use icon instead */}←
                </Button>
            ) : (
                <Link href="/" className={cx("__home")}>
                    <Logo className={cx("__logo")} />
                </Link>
            )}
            {title && (
                <Typography variant="b2" fontWeight={500}>
                    {title}
                </Typography>
            )}
        </nav>
    );
}

export default GlobalNavigation;
