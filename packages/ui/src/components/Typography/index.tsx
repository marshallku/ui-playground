import { ReactNode, createElement } from "react";
import { classNames } from "@marshallku/utils";
import { Range } from "#types";
import styles from "./index.module.scss";

export type TypographyComponent = keyof Omit<
    HTMLElementTagNameMap,
    | "area"
    | "audio"
    | "base"
    | "body"
    | "br"
    | "canvas"
    | "col"
    | "colgroup"
    | "datalist"
    | "embed"
    | "figure"
    | "form"
    | "head"
    | "hr"
    | "html"
    | "iframe"
    | "img"
    | "input"
    | "link"
    | "map"
    | "meta"
    | "noscript"
    | "object"
    | "optgroup"
    | "option"
    | "picture"
    | "progress"
    | "script"
    | "search"
    | "select"
    | "slot"
    | "source"
    | "style"
    | "template"
    | "textarea"
    | "title"
    | "track"
    | "video"
    | "wbr"
>;
export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b1" | "b2" | "c1";
export type TypographyFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type TypographyProps<T extends TypographyComponent = "p"> = {
    /** Component for rendering typography */
    component?: T;
    /** Scale of typography */
    variant?: TypographyVariant;
    /** Weight of typography */
    fontWeight?: TypographyFontWeight;
    /**  */
    marginTop?: boolean | Range<2, 32>;
    /**  */
    marginBottom?: boolean | Range<2, 32>;
    className?: string;
    children?: ReactNode;
} & JSX.IntrinsicElements[T] & { ref?: never };

const cx = classNames(styles, "typography");

function Typography<T extends TypographyComponent = "p">({
    component = "p" as T,
    variant = "b1",
    fontWeight = 400,
    marginTop,
    marginBottom,
    className,
    children,
    ...props
}: TypographyProps<T>) {
    return createElement(
        component,
        {
            className: cx(
                "",
                variant && `--${variant}`,
                fontWeight && `--${fontWeight}`,
                marginTop && `--mt-${marginTop}`,
                marginBottom && `--mb-${marginBottom}`,
                { className },
            ),
            ...props,
        },
        children,
    );
}

export default Typography;
