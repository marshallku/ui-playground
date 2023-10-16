import * as React from "react";

export interface ButtonProps {
    children: React.ReactNode;
}

function Button(props: ButtonProps) {
    return <button>{props.children}</button>;
}

export default Button;
