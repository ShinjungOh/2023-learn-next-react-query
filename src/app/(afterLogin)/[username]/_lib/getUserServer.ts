import {QueryFunction} from "@tanstack/query-core";
import {User} from "@/model/User";
import {cookies} from "next/headers";

export const getUserServer: QueryFunction<User, [_1: string, _2: string]>
    = async ({ queryKey }) => {
    const [_1, username] = queryKey;
    const res = await fetch(`http://localhost:9090/api/users/${username}`, {
        next: {
            tags: ['users', username],
        },
        cache: 'no-store',
        credentials: 'include',
        headers: {
            Cookie: cookies().toString() // 서버에서 브라우저에 쿠키보내기
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json()
}
