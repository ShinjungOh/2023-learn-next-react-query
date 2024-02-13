import {QueryFunction} from "@tanstack/query-core";
import {Post} from "@/model/Post";

export const getSearchResult: QueryFunction<Post[], [_1: string, _2: string, searchParams: { q: string, f?: string, pf?: string, }]>
    = async ({queryKey}) => {
    const [_1, _2, searchParams] = queryKey;

    const res = await fetch(`http://localhost:9090/api/search/${searchParams.q}?${searchParams.toString()}`, {
        next: {
            tags: ['post', 'search', searchParams.q], // 객체가 들어갈 수 없음. 문자열 넣어줘야 함
        },
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
