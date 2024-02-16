"use client";

import {useQuery} from "@tanstack/react-query";
import {Post as IPost} from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import {getSinglePost} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";

type Props = {
    id: string;
}

export default function SinglePost({id}: Props) {
    const {data: post, error} = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
        queryKey: ['posts', id],
        queryFn: getSinglePost,
        staleTime: 60 * 1000, // fresh -> stale time
        gcTime: 300 * 1000,
    });

    if (error) {
        return (
            <div style={{
                height: 100,
                fontSize: 31,
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                게시글을 찾을 수 없습니다.
            </div>
        )
    }

    if (!post) {
        return null; // 로딩 중
    }

    return <Post key={post.postId} post={post}/>
}
