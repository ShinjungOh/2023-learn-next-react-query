"use client";

import style from './followRecommend.module.css';
import {User} from "@/model/User";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import cx from "classnames";

type Props = {
    user: User
}

export default function FollowRecommend({user}: Props) {
    const {data: session} = useSession();
    const followed = !!user.Followers?.find((v) => v.id === session?.user?.email);
    const queryClient = useQueryClient();

    const follow = useMutation({
        mutationFn: (userId: string) => {
            console.log('follow');
            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
                method: "post",
                credentials: "include",
            });
        },
        onMutate(userId: string) {
            const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
            if (value) {
                const index = value.findIndex((v) => v.id === userId);
                console.log(value, userId, index);
                const shallow = [...value];
                shallow[index] = {
                    ...shallow[index],
                    Followers: [{id: session?.user?.email as string}],
                    _count: {
                        ...shallow[index]._count,
                        Followers: shallow[index]._count?.Followers + 1,
                    }
                }
                queryClient.setQueryData(["users", "followRecommends"], shallow);
            }
        },
        onError() {

        },
    });

    const unFollow = useMutation({
        mutationFn: (userId: string) => {
            console.log('unfollow', userId);
            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
                method: 'delete',
                credentials: 'include',
            });
        },
        onMutate(userId: string) {
            const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
            if (value) {
                const index = value.findIndex((v) => v.id === userId);
                console.log(value, userId, index);
                const shallow = [...value];
                shallow[index] = {
                    ...shallow[index],
                    Followers: shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
                    _count: {
                        ...shallow[index]._count,
                        Followers: shallow[index]._count?.Followers - 1,
                    }
                }
                queryClient.setQueryData(["users", "followRecommends"], shallow);
            }
        },
        onError() {
        },
    });

    const onFollow = () => {
        console.log('follow', followed, user.id);
        if (followed) {
            unFollow.mutate(user.id);
        } else {
            follow.mutate(user.id);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.userLogoSection}>
                <div className={style.userLogo}>
                    <img src={user.image} alt={user.id}/>
                </div>
            </div>
            <div className={style.userInfo}>
                <div className={style.title}>{user.nickname}</div>
                <div className={style.count}>@{user.id}</div>
            </div>
            <div className={cx(style.followButtonSection, followed && style.followed)}>
                <button onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</button>
            </div>
        </div>
    );
}
