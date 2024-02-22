import {QueryFunction} from "@tanstack/query-core";
import {Post} from "@/model/Post";

type Props = {
    queryKey: [
        _1: string,
        _2: string,
        searchParams: {
            q: string,
            f?: string,
            pf?: string,
        }
    ],
    pageParam?: number;
}

export const getSearchResult: QueryFunction<Post[], [_1: string, _2: string, searchParams: {
    q: string,
    f?: string,
    pf?: string,
}]> = async ({queryKey, pageParam}: Props) => {
    const [_1, _2, searchParams] = queryKey;
    const queryParams = new URLSearchParams(searchParams as any).toString();
    const res = await fetch(`http://localhost:9090/api/search/${searchParams.q}?${queryParams}&cursor=${pageParam}`, {
        next: {
            tags: ['posts', 'search', searchParams.q], // 객체가 들어갈 수 없음. 문자열 넣어줘야 함
        },
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
