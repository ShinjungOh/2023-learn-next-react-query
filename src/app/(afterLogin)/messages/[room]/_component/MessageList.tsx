"use client";

import style from "@/app/(afterLogin)/messages/[room]/chatRoom.module.css";
import cx from "classnames";
import dayjs from "dayjs";
import {getMessages} from "@/app/(afterLogin)/messages/[room]/_lib/getMessages";
import {useSession} from "next-auth/react";
import {Message} from "@/model/Message";
import {DefaultError, InfiniteData, useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import {useMessageStore} from "@/store/message";
import useSocket from "@/app/(afterLogin)/messages/[room]/_lib/useSocket";

type Props = {
    id: string;
}

export default function MessageList({id}: Props) {
    const [pageRendered, setPageRendered] = useState(false);
    const [adjustingScroll, setAdjustingScroll] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const {data: session} = useSession();
    const shouldGoDown = useMessageStore().shouldGoDown;
    const setGoDown = useMessageStore().setGoDown;
    const [socket] = useSocket();
    const queryClient = useQueryClient();
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
            if (!isFetching && hasPreviousPage && !adjustingScroll) {
                const prevHeight = listRef.current?.scrollHeight || 0;
                fetchPreviousPage()
                    .then(() => {
                        setAdjustingScroll(true);
                        setTimeout(() => {
                            console.log('prevHeight', prevHeight, listRef.current?.scrollHeight);
                            if (listRef.current) {
                                listRef.current.scrollTop = listRef.current.scrollHeight - prevHeight;
                            }
                            setAdjustingScroll(false);
                        }, 100);
                    })
            }
        }
    }, [inView, isFetching, hasPreviousPage, fetchPreviousPage, adjustingScroll]);

    let hasMessages = !!messages;

    useEffect(() => {
        if (hasMessages) {
            console.log(listRef.current);
            setTimeout(() => {
                if (listRef.current) {
                    listRef.current.scrollTop = listRef.current.scrollHeight; // 스크롤 하단으로
                }
                setPageRendered(true);
            }, 100);
        }
    }, [hasMessages]);


    useEffect(() => {
        if (shouldGoDown) {
            if (listRef.current) {
                listRef.current.scrollTop = listRef.current?.scrollHeight;
                setGoDown(false);
            }
        }
    }, [shouldGoDown, setGoDown]);

    useEffect(() => {
        socket?.on('receiveMessage', (data) => {
            console.log('data', data);
            // 리액트 쿼리 데이터에 추가
            const exMessages = queryClient.getQueryData(['rooms', {
                senderId: session?.user?.email,
                receiverId: id
            }, 'messages']) as InfiniteData<Message[]>;
            if (exMessages && typeof exMessages === 'object') {
                const newMessages = {
                    ...exMessages,
                    pages: {
                        ...exMessages.pages
                    }
                }
                const lastPage = newMessages.pages.at(-1);
                const newLastPage = lastPage ? [...lastPage] : [];
                let lastMessageId = lastPage?.at(-1)?.messageId;
                newLastPage.push(data);
                queryClient.setQueryData(['rooms', {
                    senderId: session?.user?.email,
                    receiverId: id
                }, 'messages'], newMessages);
                setGoDown(true);
            }
        });
        return () => {
            socket?.off('receiveMessage');
        }
    }, [socket]);


    return (
        <div className={style.list} ref={listRef}>
            {!adjustingScroll && pageRendered && <div ref={ref} style={{height: 10}}/>}
            {messages?.pages?.map((page) => page.map((m) => {
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
