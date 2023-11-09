import { classNames } from "@marshallku/utils";
import icons from "./constants";
import styles from "./index.module.scss";

export interface IconProps {
    /** 아이콘 이름 */
    name: (typeof icons)[number];
    /** 아이콘 크기 */
    size?: number;
    /** 클래스 명 */
    className?: string;
}

const cx = classNames(styles, "icon");

function Icon({ name, size: fontSize, className }: IconProps) {
    return <i className={cx("", `-${name}`, { className })} style={{ fontSize }} />;
}

export default Icon;
