import { ButtonHTMLAttributes, ReactNode, useMemo } from "react";
import { classNames } from "@marshallku/utils";
import Typography, { TypographyProps } from "#components/Typography";
import styles from "./index.module.scss";

export type ButtonSize = "extra-large" | "large" | "medium" | "small";
export type ButtonVariant = "base" | "text" | "primary" | "secondary" | "outline";
export type ButtonRadius = "square" | "rounded" | "capsule" | "circle";
export type ButtonResizing = "hug" | "fill";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Size of the padding and font
     *
     * default: `large`
     */
    size?: ButtonSize;
    /**
     * Style of the button
     *
     * default: `secondary`
     */
    variant?: ButtonVariant;
    /**
     * Corner radius
     *
     * default: `rounded`
     */
    radius?: ButtonRadius;
    /**
     * Horizontal width
     *
     * default: `hug`
     */
    horizontalResizing?: ButtonResizing;
    className?: string;
    children: ReactNode;
}

const cx = classNames(styles, "button");

function Button({
    size = "medium",
    variant = "secondary",
    radius = "rounded",
    horizontalResizing = "hug",
    className,
    type = "button",
    disabled,
    children,
    ...props
}: ButtonProps) {
    const typographyVariant: TypographyProps["variant"] = useMemo(() => {
        if (size === "medium") {
            return "b2";
        }

        if (size === "small") {
            return "c1";
        }

        return "b1";
    }, [size]);
    return (
        <button
            className={cx(
                "",
                `--size-${size}`,
                `--variant-${variant}`,
                `--radius-${radius}`,
                `--resizing-${horizontalResizing}`,
                disabled && "--disabled",
                {
                    className,
                },
            )}
            type={type}
            disabled={disabled}
            {...props}
        >
            {variant === "base" ? (
                children
            ) : (
                <Typography component="span" variant={typographyVariant}>
                    {children}
                </Typography>
            )}
        </button>
    );
}

export default Button;
