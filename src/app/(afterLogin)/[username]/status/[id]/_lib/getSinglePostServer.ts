import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";

export const getSinglePostServer = async ({ queryKey }: {queryKey: [string, string]}) => {
    const [_1, id] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
        next: {
            tags: ['posts', id],
            revalidate: 3600,
        },
        credentials: 'include',
        headers: {
            Cookie: cookies().toString(),
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
