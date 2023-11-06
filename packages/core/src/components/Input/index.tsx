import { InputHTMLAttributes, forwardRef } from "react";
import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const cx = classNames(styles, "input");

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
    return (
        <div className={cx()}>
            {label && <label>{label}</label>}
            <input className={cx("__input")} {...props} ref={ref} />
        </div>
    );
});

export default Input;
