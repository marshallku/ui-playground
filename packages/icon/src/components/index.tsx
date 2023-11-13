import icons from "./constants";

export interface IconProps {
    /** 아이콘 이름 */
    name: (typeof icons)[number];
    /** 아이콘 크기 */
    size?: number;
    /** 클래스 명 */
    className?: string;
}

const cx = (...args: unknown[]) => args.filter((x) => Boolean(x)).join(" ");

export function Icon({ name, size: fontSize, className }: IconProps) {
    return <i className={cx("", `-${name}`, { className })} style={{ fontSize }} />;
}
