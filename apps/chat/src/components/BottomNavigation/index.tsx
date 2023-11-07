import Link from "next/link";
import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";

const cx = classNames(styles, "bottom-navigation");

function BottomNavigation() {
    return (
        <nav className={cx()}>
            <Link href="/home">Home</Link>
            <Link href="/list">Chat</Link>
            <Link href="/profile">User</Link>
        </nav>
    );
}

export default BottomNavigation;
