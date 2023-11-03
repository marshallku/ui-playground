import { InputHTMLAttributes } from "react";
import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const cx = classNames(styles, "input");

function Input({ label, ...props }: InputProps) {
    return (
        <div className={cx()}>
            {label && <label>{label}</label>}
            <input className={cx("__input")} {...props} />
        </div>
    );
}

export default Input;
