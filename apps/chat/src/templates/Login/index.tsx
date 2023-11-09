"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Typography } from "@marshallku/ui";
import { classNames } from "@marshallku/utils";
import { authLogin } from "#api";
import { Button } from "#components";
import styles from "./index.module.scss";

const cx = classNames(styles, "login");
const loginSchema = z.object({
    name: z.string().min(1, "ID is required"),
    password: z.string().min(1, "Password is required"),
});

function LoginTemplate() {
    const { register, handleSubmit } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();

    return (
        <div className={cx()}>
            <Typography variant="h2" fontWeight={700} marginBottom={2}>
                Welcome back!
            </Typography>
            <Typography marginBottom={24}>You should be logged in for using this service.</Typography>
            <form
                className={cx("__form")}
                onSubmit={handleSubmit(async (formData) => {
                    const data = await authLogin(formData);

                    if ("statusCode" in data) {
                        return;
                    }

                    router.push("/home");
                })}
            >
                <Input label="ID" {...register("name")} />
                <Input type="password" label="Password" {...register("password")} />
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
