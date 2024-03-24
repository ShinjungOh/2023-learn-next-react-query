import style from "./chatRoom.module.css";
import cx from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import MessageForm from "@/app/(afterLogin)/messages/[room]/_component/MessageForm";
import {getUserServer} from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import {auth} from "@/auth";
import {QueryClient} from "@tanstack/react-query";
import UserInfo from "@/app/(afterLogin)/messages/[room]/_component/UserInfo";
import WebSocketComponent from "@/app/(afterLogin)/messages/[room]/_component/WebSocketComponent";

dayjs.locale('ko');
dayjs.extend(relativeTime)

type Props = {
    params: { room: string; }
}

export default async function ChatRoom({params}: Props) {
    const session = await auth();
    const queryClient = new QueryClient();
    const ids = params.room.split('-').filter((v) => v !== session?.user?.email); // 상대방 id
    if (!ids[0]) {
        return null;
    }
    await queryClient.prefetchQuery({
        queryKey: ['user', ids[0]],
        queryFn: getUserServer,
    });

    const messages = [
        {messageId: 1, roomId: 123, id: 'shinjung', content: '안녕하세요.', createdAt: new Date()},
        {messageId: 2, roomId: 123, id: 'kim', content: '안녕히계세요.', createdAt: new Date()},
    ]

    return (
        <main className={style.main}>
            <WebSocketComponent/>
            <UserInfo id={ids[0]}/>
            <div className={style.list}>
                {messages.map((m) => {
                    if (m.id === 'shinjung') { // 내 메시지일 때
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
                })}
            </div>
            <MessageForm id={ids[0]}/>
        </main>
    );
}
