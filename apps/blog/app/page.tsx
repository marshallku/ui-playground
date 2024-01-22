"use server";

import Link from "next/link";
import { getHomeData } from "#api/home";

export default async function Home() {
    const data = await getHomeData();

    return (
        <section>
            <h2>Recent posts</h2>
            {data.list.map((post) => (
                <article key={post.uri}>
                    <Link href={new URL(post.uri).pathname}>
                        <header>
                            <h3>{post.title}</h3>
                        </header>
                        <footer>
                            <p>{post.desc}</p>
                            <time dateTime={post.date}>{post.dateFormat}</time>
                        </footer>
                    </Link>
                </article>
            ))}
        </section>
    );
}
