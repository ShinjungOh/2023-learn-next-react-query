import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

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

            if (!authResponse.ok) {
                return null // 로그인 실패 이유 추가
            }

            const user = await authResponse.json()

            return user
        },
    }),
    ]
});
