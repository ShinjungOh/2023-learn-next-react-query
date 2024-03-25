import {useCallback, useEffect} from "react";
import {io, Socket} from "socket.io-client";
import {useSession} from "next-auth/react";

let socket: Socket | null; // 안티패턴이지만 커스텀훅 간 공유할 데이터는 여기에 넣어두기

export default function useSocket(): [Socket | null, () => void] {
    const {data: session} = useSession();
    const disconnect = useCallback(() => {
        socket?.disconnect();
        socket = null;
    }, []);

    useEffect(() => {
        if (!socket) { // 중복 연결 방지
            socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
                transports: ['websocket'],
            });
            socket.on('connect_error', (err) => {
                console.error(err);
                console.log(`connect_error due to ${err.message}`);
            });
        }
    }, [session]);

    useEffect(() => {
        if (socket?.connected && session?.user?.email) {
            socket?.emit('login', {
                id: session?.user?.email,
            });
        }
    }, [session]);

    return [socket, disconnect];
}
