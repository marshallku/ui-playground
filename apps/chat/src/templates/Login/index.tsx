"use client";

import { Input, Typography } from "@marshallku/core";
import { classNames } from "@marshallku/utils";
import { login } from "app/actions";
import { Button } from "#components";
import styles from "./index.module.scss";

const cx = classNames(styles, "login");

function LoginTemplate() {
    return (
        <div className={cx()}>
            <Typography variant="h2" fontWeight={700} marginBottom={2}>
                Welcome back!
            </Typography>
            <Typography marginBottom={24}>You should be logged in for using this service.</Typography>
            <form className={cx("__form")} action={login}>
                <Input name="username" label="ID" />
                <Input type="password" name="password" label="Password" />
                <div className={cx("__buttons")}>
                    <Button type="submit" variant="primary" size="large" horizontalResizing="fill">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default LoginTemplate;
