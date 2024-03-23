"use client";

import style from "../chatRoom.module.css";
import Link from "next/link";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";

type Props = {
    id: string;
}

export default function UserInfo({id}: Props) {
    const {data: user} = useQuery({
        queryKey: ['user', id],
        queryFn: getUser,
    });

    if (!user) {
        return null;
    }

    return (
        <>
            <div className={style.header}>
                <BackButton/>
                <div><h2>{user.nickname}</h2></div>
            </div>
            <Link href={user.nickname} className={style.userInfo}>
                <img src={user.image} alt={user.id}/>
                <div><b>{user.nickname}</b></div>
                <div>@{user.id}</div>
            </Link>
        </>
    );
}
