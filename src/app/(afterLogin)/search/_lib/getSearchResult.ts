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

export const getSearchResult= async ({queryKey, pageParam}: Props) => {
    const [_1, _2, searchParams] = queryKey;
    const queryParams = new URLSearchParams(searchParams as any).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?${queryParams}&cursor=${pageParam}`, {
        next: {
            tags: ['posts', 'search', searchParams.q], // 객체가 들어갈 수 없음. 문자열 넣어줘야 함
        },
        credentials: 'include',
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
