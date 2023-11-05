import Logo from "#components/Logo";
import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";
import Link from "next/link";

export interface GlobalNavigationProps {}

const cx = classNames(styles, "global-navigation");

function GlobalNavigation({}: GlobalNavigationProps) {
    return (
        <nav className={cx()}>
            <Link href="/" className={cx("__home")}>
                <Logo className={cx("__logo")} />
            </Link>
        </nav>
    );
}

export default GlobalNavigation;
