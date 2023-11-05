import Link from "next/link";
import { Button as CoreButton, ButtonProps } from "@marshallku/core";

function Button<T extends object>(props: ButtonProps<T>) {
    if ("href" in props) {
        return <CoreButton component={Link} {...props} />;
    }

    return <CoreButton {...props} />;
}

export default Button;
