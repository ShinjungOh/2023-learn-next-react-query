"use client";

import {useQuery} from "@tanstack/react-query";
import {Post as IPost} from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import {getUserPosts} from "@/app/(afterLogin)/[username]/_lib/getUserPosts";

type Props = {
    username: string;
}

export default function UserPosts({username}: Props) {
    const {data} = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
        queryKey: ['posts', 'users', username],
        queryFn: getUserPosts,
        staleTime: 60 * 1000, // fresh -> stale time
        gcTime: 300 * 1000,
    });

    return data?.map((post) => (
        <Post key={post.postId} post={post}/>
    ))
}
