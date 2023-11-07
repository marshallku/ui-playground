import { cookies } from "next/headers";
import { User } from "#api";
import { HomeTemplate } from "#templates";

async function getUsers(): Promise<User[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_SERVER_API_URL}/user/list`, {
        headers: {
            "Content-Type": "application/json",
            Cookie: cookies().toString(),
        },
        credentials: "include",
        cache: "no-store",
    });
    const data = await response.json();

    return data;
}

export default async function Home() {
    const data = await getUsers();

    return (
        <main>
            <HomeTemplate data={data} />
        </main>
    );
}
