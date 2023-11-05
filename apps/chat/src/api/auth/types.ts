export interface LoginRequest {
    name: string;
    password: string;
}

export interface LoginResponse {
    name: string;
    role: string;
}

export interface SignUpRequest {
    name: string;
    password: string;
}

export interface SignUpResponse {
    name: string;
    role: string;
}
