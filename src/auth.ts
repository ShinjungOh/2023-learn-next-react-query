import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from 'cookie';
import {cookies} from "next/headers";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
} = NextAuth({
    pages: {
        signIn: '/i/flow/login',
        newUser: '/i/flow/signup',
    },
    providers: [
    CredentialsProvider({
        async authorize(credentials) {
            const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: credentials.username,
                    password: credentials.password,
                }),
            })

            let setCookie = authResponse.headers.get('set-cookie');
            console.log('setCookie', setCookie);
            if (setCookie) {
                const parsed = cookie.parse(setCookie);
                cookies().set('connect.sid', parsed['connect.sid'], parsed); // 브라우저에 쿠키륾 심어주는 것
            }

            if (!authResponse.ok) {
                return null // 로그인 실패 이유 추가
            }

            const user = await authResponse.json()

            return {
                email: user.id,
                name: user.nickname,
                image: user.image,
                ...user,
            }
        },
    }),
    ]
});
