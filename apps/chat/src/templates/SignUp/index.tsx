"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Typography } from "@marshallku/core";
import { classNames } from "@marshallku/utils";
import { authSignUp } from "#api";
import { Button } from "#components";
import styles from "./index.module.scss";

const cx = classNames(styles, "sign-up");
const signUpSchema = z
    .object({
        name: z.string().min(1, "ID is required"),
        password: z.string().min(1, "Password is required"),
        confirmPassword: z.string().min(1, "You should confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password don't match",
    });

function SignUpTemplate() {
    const { register, handleSubmit } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
    });
    const router = useRouter();

    return (
        <div className={cx()}>
            <Typography variant="h2" fontWeight={700} marginBottom={2}>
                Hi there!
            </Typography>
            <Typography marginBottom={24}>Please sign up to use this application</Typography>
            <form
                className={cx("__form")}
                onSubmit={handleSubmit(async ({ name, password }) => {
                    const data = await authSignUp({ name, password });

                    if ("statusCode" in data) {
                        return;
                    }

                    router.push("/");
                })}
            >
                <Input label="ID" {...register("name")} />
                <Input type="password" label="Password" {...register("password")} />
                <Input type="password" label="Confirm password" {...register("confirmPassword")} />
                <div className={cx("__buttons")}>
                    <Button type="submit" variant="primary" size="large" horizontalResizing="fill">
                        Sign up
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignUpTemplate;
