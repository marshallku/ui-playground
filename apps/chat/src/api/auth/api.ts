import { CommonApiError } from "../types/error";
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from "./types";

export async function authLogin(requestBody: LoginRequest): Promise<LoginResponse | CommonApiError> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_SERVER_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
    });
    const data = await response.json();

    return data;
}

export async function authSignUp(requestBody: SignUpRequest): Promise<SignUpResponse | CommonApiError> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_SERVER_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
    });
    const data = response.json();

    return data;
}
