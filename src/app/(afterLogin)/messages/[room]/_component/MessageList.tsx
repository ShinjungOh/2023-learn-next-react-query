"use client";

import style from "@/app/(afterLogin)/messages/[room]/chatRoom.module.css";
import cx from "classnames";
import dayjs from "dayjs";
import {getMessages} from "@/app/(afterLogin)/messages/[room]/_lib/getMessages";
import {useSession} from "next-auth/react";
import {Message} from "@/model/Message";
import {DefaultError, InfiniteData, useInfiniteQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import {useInView} from "react-intersection-observer";

type Props = {
    id: string;
}

export default function MessageList({id}: Props) {
    const {data: session} = useSession();
    const {
        data: messages,
        hasPreviousPage,
        fetchPreviousPage,
        isFetching,
        fetchNextPage,
    } = useInfiniteQuery<Message[], DefaultError, InfiniteData<Message[]>, [string, {
        senderId: string;
        receiverId: string;
    }, string], number>({
        queryKey: ['rooms', {senderId: session?.user?.email!, receiverId: id}, 'messages'],
        queryFn: getMessages,
        initialPageParam: 0,
        getPreviousPageParam: (firstPage) => firstPage.at(0)?.messageId,
        getNextPageParam: (lastPage) => lastPage.at(-1)?.messageId,
        enabled: !!(session?.user?.email && id),
    });
    const {ref, inView} = useInView({
        threshold: 0,
        delay: 0,
    });

    useEffect(() => {
        if (inView) {
            !isFetching && hasPreviousPage && fetchPreviousPage();
        }
    }, [inView, isFetching, hasPreviousPage, fetchPreviousPage]);

    return (
        <div className={style.list}>
            <div ref={ref} style={{height: 50}}/>
            {messages?.pages.map((page) => page.map((m) => {
                    if (m.senderId === session?.user?.email) { // 내 메시지일 때
                        return (
                            <div
                                key={m.messageId}
                                className={cx(style.message, style.myMessage)}>
                                <div className={style.content}>{m.content}</div>
                                <div className={style.date}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
                            </div>
                        );
                    }
                    return (
                        <div
                            key={m.messageId}
                            className={cx(style.message, style.yourMessage)}>
                            <div className={style.content}>{m.content}</div>
                            <div className={style.date}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
                        </div>
                    );
                }
            ))}
        </div>
    );
}
