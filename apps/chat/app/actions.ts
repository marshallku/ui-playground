"use server";

import { authLogin } from "#api";

export async function login(formData: FormData) {
    const name = formData.get("username");
    const password = formData.get("password");

    if (!name || !password) {
        throw new Error("Invalid input");
    }

    const data = await authLogin({ name: `${name}`, password: `${password}` });

    return data;
}
