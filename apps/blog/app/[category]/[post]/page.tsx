"use server";

import Link from "next/link";
import { getPostData } from "#api/post";

interface PostProps {
    params: {
        category: string;
        post: string;
    };
}

export default async function Post({ params: { category, post } }: PostProps) {
    const data = await getPostData(`/${category}/${post}`);

    return (
        <section>
            <header>
                <Link href={new URL(data.category.link).pathname}>{data.category.name}</Link>
                <h1>{data.title}</h1>
            </header>
            <article dangerouslySetInnerHTML={{ __html: data.body }} />
        </section>
    );
}
