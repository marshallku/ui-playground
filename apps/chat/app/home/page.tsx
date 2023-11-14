import { User, request } from "#api";
import { HomeTemplate } from "#templates";

async function getUsers(): Promise<User[]> {
    return request<User[]>("/user/list");
}

export default async function Home() {
    const data = await getUsers();

    return (
        <main>
            <HomeTemplate data={data} />
        </main>
    );
}

export const dynamic = "force-dynamic";
